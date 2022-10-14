import { http } from '../helpers/http';
import { useNavigate } from 'react-router-dom';
import { toastLoading, toastUpdate, swalConfirm } from '../tools';
import { config } from '../config';
import { usePropertiesContext } from '../context/PropertiesContext';

const { URL } = config;
const { CREATE, EDIT, DELETE } = config.PROPERTIES_API;

const Properties = () => {
    const { propertiesDb, setPropertiesDb, recordsDb, setRecordsDb } = usePropertiesContext();
    let api = http();
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    // ********** Crear predio **********
    const createProperty = async (property) => {
        let endpoint = URL + CREATE
        let options = {
            body: JSON.stringify(property),
            headers: {
                "content-type": "application/json",
                "authorization": `Bearer ${token}`
            }
        }
        const loading = toastLoading()
        const res = await api.post(endpoint, options);
        if (!res.status) {
            toastUpdate(
                loading,
                { msg: "Error, no hay conexión con el servidor!!!", type: "error", theme: "colored", autoClose: false })
        } else {
            if (res.property) {
                setPropertiesDb([...propertiesDb, res.property])
                toastUpdate(loading, { msg: res.msg, type: "success" })
                setRecordsDb([...recordsDb, res.record])
            } else {
                toastUpdate(loading, { msg: res.msg, type: "error" })
            }
        }
    };

    // ********** Editar predio **********
    const updateProperty = async (property, property_id) => {
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
        const loading = toastLoading()
        const res = await api.put(endpoint, options);
        if (!res.status) {
            toastUpdate(
                loading,
                { msg: "Error, no hay conexión con el servidor!!!", type: "error", theme: "colored", autoClose: false })
        } else {
            if (res.status === "ok") {
                setPropertiesDb(res.properties);
                setRecordsDb([...recordsDb, res.record])
                toastUpdate(loading, { msg: res.msg, type: "success" })
                navigate("/admin/manage-properties", { replace: true })
            } else {
                toastUpdate(loading, { msg: res.msg, type: "error" })
            }
        }
    };

    // ********** Eliminar Predio **********
    const deleteProperty = (property) => {
        let code = property.param
        let property_id = property._id
        swalConfirm({
            msg: `¿Estás seguro que quieres eliminar el predio con id <b>${code}</b>?`,
            icon: 'warning'
        }).then(res => {
            if (res.isConfirmed) {
                let endpoint = URL + DELETE + property_id
                let options = {
                    headers: {
                        "authorization": `Bearer ${token}`
                    }
                }
                const loading = toastLoading()
                api.del(endpoint, options).then((res) => {
                    if (!res.status) {
                        toastUpdate(
                            loading,
                            { msg: "Error, no hay conexión con el servidor!!!", type: "error", theme: "colored", autoClose: false })
                    } else {
                        if (res.status === "ok") {
                            setPropertiesDb(propertiesDb.filter((e) => e._id !== property_id))
                            setRecordsDb([...recordsDb, res.record])
                            toastUpdate(loading, { msg: res.msg, type: "success" })
                        } else {
                            toastUpdate(loading, { msg: res.msg, type: "error" })
                        }
                    }
                });
            }
        });
    };

    return {
        createProperty,
        updateProperty,
        deleteProperty,
    }
}

export default Properties;
