import { http } from '../helpers/http';
import { useNavigate } from 'react-router-dom';
import { swalConfirm } from '../tools';
import { config } from '../config';
import { usePropertiesContext } from '../context/PropertiesContext';
import { toast } from 'react-toastify';

const { URL } = config;
const { CREATE, EDIT, DELETE } = config.PROPERTIES_API;

const Properties = () => {
    const { propertiesDb, setPropertiesDb, recordsDb,
        setRecordsDb, setIsSending } = usePropertiesContext();
    let api = http();
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    // ********** Crear predio **********
    const createProperty = async (property) => {
        try {
            let endpoint = URL + CREATE
            let options = {
                body: JSON.stringify(property),
                headers: {
                    "content-type": "application/json",
                    "authorization": `Bearer ${token}`
                }
            }
            setIsSending(true);
            const res = await api.post(endpoint, options);
            if (!res.error) {
                setPropertiesDb([...propertiesDb, res.property])
                setRecordsDb([...recordsDb, res.record])
                toast.success(res.msg)
                return;
            }
            await Promise.reject(res);
        } catch (error) {
            toast.error(error.msg);
        } finally {
            setIsSending(false);
        }
    };

    // ********** Editar predio **********
    const updateProperty = async (property, property_id) => {
        try {
            let propertyValue = property.value.replace(/[$.]/g, '')
            let taxValue = propertyValue * 0.01
            property.tax_value = Math.round(taxValue)
            let endpoint = URL + EDIT + property_id
            let options = {
                body: JSON.stringify(property),
                headers: {
                    "content-type": "application/json",
                    "authorization": `Bearer ${token}`
                }
            }
            setIsSending(true);
            const res = await api.put(endpoint, options);
            if (!res.error) {
                setPropertiesDb(res.properties);
                setRecordsDb([...recordsDb, res.record])
                toast.success(res.msg)
                navigate("/admin/manage-properties", { replace: true })
                return;
            }
            await Promise.reject(res);
        } catch (error) {
            toast.error(error.msg);
        } finally {
            setIsSending(false);
        }
    };

    // ********** Eliminar Predio **********
    const deleteProperty = async (property) => {
        try {
            let code = property.param
            let property_id = property._id
            const resConfirm = await swalConfirm({
                msg: `¿Estás seguro que quieres eliminar el predio con id <b>${code}</b>?`,
                icon: 'warning'
            });
            if (resConfirm.isConfirmed) {
                let endpoint = URL + DELETE + property_id
                let options = {
                    headers: {
                        "authorization": `Bearer ${token}`
                    }
                }
                const res = await api.del(endpoint, options);
                if (!res.error) {
                    setPropertiesDb(propertiesDb.filter((e) => e._id !== property_id))
                    setRecordsDb([...recordsDb, res.record])
                    toast.success(res.msg)
                    return;
                }
                await Promise.reject(res);
            }
        } catch (error) {
            toast.error(error.msg);
        }
    };

    return {
        createProperty,
        updateProperty,
        deleteProperty,
    }
}

export default Properties;
