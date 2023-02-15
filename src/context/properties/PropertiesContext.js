import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { toast } from "react-toastify";
import { config } from "../../config";
import { http } from "../../helpers/http";
import { useAuthContext } from "..";
import propertiesReducers from "./propertiesReducers";

const PropertiesContext = createContext();

const { URL } = config;
const { LIST_PROPERTIES, RECORDS, FIND, LIST_ASSOCIATED_PROPERTIES } = config.PROPERTIES_API;

const initialState = {
    propertiesDb: [],
    recordsDb: [],
    foundProperties: [],
    associatedProperties: [],
}

const PropertiesProvider = ({ children }) => {
    const [state, dispatch] = useReducer(propertiesReducers, initialState)
    const { propertiesDb, recordsDb, foundProperties, associatedProperties } = state;
    
    const [propertyToEdit, setPropertyToEdit] = useState(null);
    const [propertyOwnerIdNumber, setPropertyOwnerIdNumber] = useState(null);
    const [propertiesError, setPropertiesError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSending, setIsSending] = useState(false);

    const { payload, auth } = useAuthContext();
    const user_id = payload?._id;

    useEffect(() => {
        const params = {
            setIsLoading,
            setError: setPropertiesError,
        }
        const fetchProperties = async () => {
            params.endpoint = URL + LIST_PROPERTIES;
            const res = await http().get(params);
            if (res) {
                const { properties, msg } = res;
                properties
                    ? dispatch({ type: 'GET_ALL_PROPERTIES', payload: properties })
                    : toast.info(msg);
            }
        }
        const fetchRecords = async () => {
            params.endpoint = URL + RECORDS;
            const res = await http().get(params);
            if (res) {
                const { records, msg } = res;
                records
                    ? dispatch({ type: 'GET_ALL_RECORDS', payload: records })
                    : toast.info(msg);
            }
        }
        fetchProperties();
        fetchRecords();
    }, []);

    useEffect(() => {
        if (propertyOwnerIdNumber === null) return;
        const { owner_id_number } = propertyOwnerIdNumber;
        const params = {
            endpoint: URL + FIND + owner_id_number,
            setIsLoading,
            setError: setPropertiesError,
        }
        const findProperties = async () => {
            const res = await http().get(params);
            if (res) {
                res.foundProperties
                    ?
                    dispatch({ type: 'FIND_PROPERTIES_BY_OWNER_ID_NUMBER', payload: res.foundProperties })
                    :
                    toast.error(
                        <div>{res.msg} <b><em>{owner_id_number}</em>.</b></div>,
                        { position: "bottom-center", toastId: "error" }
                    );
            }
        }
        findProperties();
    }, [propertyOwnerIdNumber]);

    useEffect(() => {
        if (!user_id) return;
        const params = {
            endpoint: URL + LIST_ASSOCIATED_PROPERTIES + user_id,
            setIsLoading,
            setError: setPropertiesError,
        }
        const fetchAssociatedProperties = async () => {
            const res = await http().get(params);
            if (res?.associatedProperties) {
                dispatch({ type: 'GET_ASSOCIATED_PROPERTIES', payload: res.associatedProperties })
            }
        }
        fetchAssociatedProperties();
    }, [foundProperties, user_id]);

    useEffect(() => {
        dispatch({ type: 'CLEAN_FOUND_PROPERTIES', payload: [] })
    }, [auth])

    const data = {
        state, dispatch,
        propertiesDb, recordsDb,
        foundProperties, associatedProperties,
        propertyToEdit, setPropertyToEdit,
        setPropertyOwnerIdNumber,
        propertiesError, isLoading,
        isSending, setIsSending
    }

    return (
        <PropertiesContext.Provider value={data}>
            {children}
        </PropertiesContext.Provider>
    )
}

const usePropertiesContext = () => useContext(PropertiesContext);
export { PropertiesProvider, usePropertiesContext };
