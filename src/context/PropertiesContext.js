import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { config } from "../config";
import { http } from "../helpers/http";
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

    useEffect(() => {
        const params = {
            setIsLoading,
            setError: setPropertiesError,
            setErrorMsg: setPropertiesErrorMsg
        }
        // ********** Obtener Predios **********
        const fetchProperties = async () => {
            params.endpoint = URL + LIST_PROPERTIES;
            const res = await http().get(params);
            if (res) {
                const { properties, msg } = res;
                properties ? setPropertiesDb(properties) : toast.info(msg);
            }
        }
        // ********** Obtener Historial **********
        const fetchRecords = async () => {
            params.endpoint = URL + RECORDS;
            const res = await http().get(params);
            if (res) {
                const { records, msg } = res;
                records ? setRecordsDb(records) : toast.info(msg);
            }
        }
        fetchProperties();
        fetchRecords();
    }, []);

    // ********** Buscar predios por documento del propietario **********
    useEffect(() => {
        if (searchProperties === null) return;
        const { owner_id_number } = searchProperties;
        const params = {
            endpoint: URL + FIND + owner_id_number,
            setIsLoading,
            setError: setPropertiesError,
            setErrorMsg: setPropertiesErrorMsg
        }
        const findProperties = async () => {
            const res = await http().get(params);
            if (res) {
                res.foundProperties
                    ?
                    setFoundProperties(res.foundProperties)
                    :
                    toast.error(
                        <div>{res.msg} <b><em>{owner_id_number}</em>.</b></div>,
                        { position: "bottom-center", toastId: "error" }
                    );
            }
        }
        findProperties();
    }, [searchProperties]);

    // ********** Obtener predios asociados de un usuario **********
    useEffect(() => {
        if (!user_id) return;
        const params = {
            endpoint: URL + LIST_ASSOCIATED_PROPERTIES + user_id,
            setIsLoading,
            setError: setPropertiesError,
            setErrorMsg: setPropertiesErrorMsg
        }
        const fetchAssociatedProperties = async () => {
            const res = await http().get(params);
            if (res?.associatedProperties) {
                setAssociatedProperties(res.associatedProperties);
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
