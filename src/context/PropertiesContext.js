import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { config } from "../config";
import { http } from "../helpers/http";
import { toastValidate } from "../tools";
import { useAuthContext } from "./AuthContext";

const PropertiesContext = createContext();

const { URL } = config;
const { LIST_PROPERTIES, RECORDS, FIND, LIST_ASSOCIATED_PROPERTIES } = config.PROPERTIES_API;

const PropertiesProvider = ({ children }) => {
    const [propertiesDb, setPropertiesDb] = useState([]);
    const [propertyToEdit, setPropertyToEdit] = useState(null);
    const [recordsDb, setRecordsDb] = useState([]);
    const [searchProperties, setSearchProperties] = useState(null);
    const [foundProperties, setFoundProperties] = useState([]);
    const [associatedProperties, setAssociatedProperties] = useState([])
    const [propertiesError, setPropertiesError] = useState(null);
    const [propertiesErrorMsg, setPropertiesErrorMsg] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const { payload, auth } = useAuthContext();
    const user_id = payload?._id;

    const handleError = (errorMsg) => {
        setPropertiesError(true);
        setPropertiesErrorMsg(errorMsg);
    }

    useEffect(() => {
        // ********** Obtener Predios **********
        const fetchProperties = async () => {
            try {
                setIsLoading(true);
                const res = await http().get(URL + LIST_PROPERTIES);
                if (!res.error) {
                    const { properties, msg } = res;
                    return properties ? setPropertiesDb(properties) : toast.info(msg);
                }
                await Promise.reject(res);
            } catch (error) {
                handleError(`${error.status ? "Properties Database Error -" : ""} ${error.msg}`);
            } finally {
                setIsLoading(false);
            }
        }
        // ********** Obtener Historial **********
        const fetchRecords = async () => {
            try {
                setIsLoading(true);
                const res = await http().get(URL + RECORDS);
                if (!res.error) {
                    const { records } = res;
                    return records && setRecordsDb(res.records);
                }
                await Promise.reject(res);
            } catch (error) {
                handleError(`${error.status ? "Records Database Error -" : ""} ${error.msg}`);
            } finally {
                setIsLoading(false);
            }
        }
        fetchProperties();
        fetchRecords();
    }, []);

    // ********** Buscar predios por documento del propietario **********
    useEffect(() => {
        if (searchProperties === null) return;
        const findProperties = async () => {
            try {
                setIsLoading(true);
                setPropertiesError(null);
                const { owner_id_number } = searchProperties;
                const res = await http().get(URL + FIND + owner_id_number);
                if (!res.error) {
                    return res.foundProperties
                        ?
                        setFoundProperties(res.foundProperties)
                        :
                        toastValidate({
                            msg: <div>{res.msg} <b><em>{owner_id_number}</em>.</b></div>,
                            position: "bottom-center"
                        });
                }
                await Promise.reject(res);
            } catch (error) {
                handleError(error.msg);
            } finally {
                setIsLoading(false);
            }
        }
        findProperties();
    }, [searchProperties]);

    // ********** Obtener predios asociados de un usuario **********
    useEffect(() => {
        if (!user_id) return;
        const fetchAssociatedProperties = async () => {
            try {
                setIsLoading(true);
                const res = await http().get(URL + LIST_ASSOCIATED_PROPERTIES + user_id);
                if (!res.error) {
                    return res.associatedProperties && setAssociatedProperties(res.associatedProperties);
                }
                await Promise.reject(res);
            } catch (error) {
                handleError(error.msg)
            } finally {
                setIsLoading(false);
            }
        }
        fetchAssociatedProperties();
    }, [foundProperties, user_id]);

    // ********** Limpiar busqueda **********
    useEffect(() => {
        setFoundProperties([]);
    }, [auth])

    const data = {
        propertiesDb, setPropertiesDb,
        propertyToEdit, setPropertyToEdit,
        recordsDb, setRecordsDb,
        searchProperties, setSearchProperties,
        foundProperties, setFoundProperties,
        associatedProperties, setAssociatedProperties,
        propertiesError, propertiesErrorMsg,
        isLoading, isSending, setIsSending
    }

    return (
        <PropertiesContext.Provider value={data}>
            {children}
        </PropertiesContext.Provider>
    )
}

export const usePropertiesContext = () => useContext(PropertiesContext);
export { PropertiesProvider };
