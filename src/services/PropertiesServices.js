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
    let { post, put } = http();
    const navigate = useNavigate();

    // ********** Crear predio **********
    const createProperty = async (property) => {
        const params = {
            endpoint: URL + CREATE,
            options: { body: property },
            setIsSending
        }
        const res = await post(params);
        if (res) {
            setPropertiesDb([...propertiesDb, res.property])
            setRecordsDb([...recordsDb, res.record])
            toast.success(res.msg)
        }
    };

    // ********** Editar predio **********
    const updateProperty = async (property, property_id) => {
        const params = {
            endpoint: URL + EDIT + property_id,
            options: { body: property },
            setIsSending
        }
        const res = await put(params);
        if (res) {
            setPropertiesDb(res.properties);
            setRecordsDb([...recordsDb, res.record])
            toast.success(res.msg)
            navigate("/admin/manage-properties", { replace: true })
        }
    };

    // ********** Eliminar Predio **********
    const deleteProperty = async (property) => {
        let code = property.param
        let property_id = property._id
        const resConfirm = await swalConfirm({
            msg: `¿Estás seguro que quieres eliminar el predio con id <b>${code}</b>?`,
            icon: 'warning'
        });
        if (resConfirm.isConfirmed) {
            const params = {
                endpoint: URL + DELETE + property_id,
                setIsSending
            }
            const res = await put(params);
            if (res) {
                setPropertiesDb(propertiesDb.filter((e) => e._id !== property_id))
                setRecordsDb([...recordsDb, res.record])
                toast.success(res.msg)
            }
        }
    };

    return {
        createProperty,
        updateProperty,
        deleteProperty,
    }
}

export default Properties;
