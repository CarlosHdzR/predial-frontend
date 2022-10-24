import { createContext, useContext, useEffect, useState } from "react";
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

    // ********** Obtener Predios e Historial **********
    useEffect(() => {
        const fetchPropertiesData = async () => {
            try {
                setIsLoading(true);
                const resProperties = await http().get(URL + LIST_PROPERTIES);
                const resRecords = await http().get(URL + RECORDS);
                if (!resProperties.error && !resRecords.error) {
                    setPropertiesDb(resProperties.properties);
                    setRecordsDb(resRecords.records)
                    return
                }
                let error = resProperties.error ? resProperties : resRecords;
                await Promise.reject(error);
            } catch (error) {
                handleError(`${error.status ? "Properties Database Error -" : ""} ${error.msg}`);
            } finally {
                setIsLoading(false);
            }
        }
        fetchPropertiesData();
    }, []);

    // ********** Buscar predios por documento del propietario **********
    useEffect(() => {
        if (searchProperties === null) return;
        const findProperties = async () => {
            try {
                setIsLoading(true);
                const { owner_id_number } = searchProperties;
                const res = await http().get(URL + FIND + owner_id_number);
                if (res.error) {
                    await Promise.reject(res);
                }
                if (res.foundProperties.length > 0) {
                    return setFoundProperties(res.foundProperties);
                }
                toastValidate({
                    msg: () =>
                        <div>
                            {res.msg} {res.status === "ok" && <b><em>{owner_id_number}</em>.</b>}
                        </div>,
                    position: "bottom-center"
                });
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
            setIsLoading(true);
            const res = await http().get(URL + LIST_ASSOCIATED_PROPERTIES + user_id);
            if (res.status) {
                // setError(null);
                if (res.associatedProperties) {
                    setAssociatedProperties(res.associatedProperties);
                }
            }
            setIsLoading(false);
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
