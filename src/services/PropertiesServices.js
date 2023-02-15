import { http } from '../helpers/http';
import { useNavigate } from 'react-router-dom';
import { swalAlert, swalConfirm } from '../tools';
import { config } from '../config';
import { toast } from 'react-toastify';
import { usePropertiesContext } from '../context';

const { URL } = config;
const { CREATE, EDIT, DELETE, ASSOCIATE_PROPERTIES, PAY_TAX } = config.PROPERTIES_API;

const Properties = () => {
    const { dispatch, propertiesDb, foundProperties,
        associatedProperties, setIsSending } = usePropertiesContext();
    let { post, put } = http();
    const navigate = useNavigate();

    const createProperty = async (property) => {
        const params = {
            endpoint: URL + CREATE,
            options: { body: property },
            setIsSending
        }
        const res = await post(params);
        if (res) {
            dispatch({ type: 'CREATE_PROPERTY', payload: res.property })
            dispatch({ type: 'CREATE_RECORD', payload: res.record })
            toast.success(res.msg)
        }
    };

    const updateProperty = async (property, property_id) => {
        const params = {
            endpoint: URL + EDIT + property_id,
            options: { body: property },
            setIsSending
        }
        const res = await put(params);
        if (res) {
            dispatch({ type: 'UPDATE_PROPERTY', payload: res.properties })
            dispatch({ type: 'CREATE_RECORD', payload: res.record })
            toast.success(res.msg)
            navigate("/admin/manage-properties", { replace: true })
        }
    };

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
                const newData = propertiesDb.filter((e) => e._id !== property_id);
                dispatch({ type: 'DELETE_PROPERTY', payload: newData })
                dispatch({ type: 'CREATE_RECORD', payload: res.record })
                toast.success(res.msg)
            }
        }
    };

    const associateProperty = async (user_id, property_id) => {
        const params = {
            endpoint: URL + ASSOCIATE_PROPERTIES + user_id,
            options: { body: { property_id } },
            setIsSending
        }
        const res = await put(params);
        if (res) {
            const newData = foundProperties.map((property) => property._id === res.associatedProperty._id ? res.associatedProperty : property)
            dispatch({ type: 'ASSOCIATE_PROPERTY', payload: newData })
            toast.success(res.msg, { toastId: "success" })
        }
    };

    const payTax = async (code) => {
        const params = {
            endpoint: URL + PAY_TAX,
            options: { body: { code } },
            setIsSending
        }
        const res = await put(params);
        if (res) {
            const newData = associatedProperties.map((property) => property.code === code ? res.property : property)
            dispatch({ type: 'PAY_TAX', payload: newData })
            swalAlert({
                msg: `<b>El pago correspondiente al predio con código <br/>
                    <span class="text-danger">${res.property.code}</span>, por un valor 
                    de <span class="text-danger">${res.property.tax_value}</span> 
                    fue procesado exitosamente!!!</b>`,
                icon: 'success'
            });
        }
    }

    return {
        createProperty,
        updateProperty,
        deleteProperty,
        associateProperty,
        payTax
    }
}

export default Properties;
