import { createContext, useContext, useEffect, useState } from "react";
import { config } from "../config";
import { http } from "../helpers/http";
import { toastValidate } from "../tools";
import { useAuthContext } from "./AuthContext";

const PropertiesContext = createContext();

const { URL } = config;
const { LIST_PROPERTIES, HISTORIAL, FIND, LIST_ASSOCIATED_PROPERTIES } = config.PROPERTIES_API;

const PropertiesProvider = ({ children }) => {
    const [propertiesDb, setPropertiesDb] = useState([]);
    const [propertyToEdit, setPropertyToEdit] = useState(null);
    const [historial, setHistorial] = useState([]);
    const [searchProperties, setSearchProperties] = useState(null);
    const [foundProperties, setFoundProperties] = useState([]);
    const [associatedProperties, setAssociatedProperties] = useState([])
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [msgError, setMsgError] = useState(null);
    const api = http();
    const { payload, auth } = useAuthContext();

    // ********** Obtener Predios **********
    const fetchProperties = async () => {
        await api.get(URL + LIST_PROPERTIES)
            .then((res) => {
                if (!res.error) {
                    setError(null);
                    if (res.properties) {
                        setPropertiesDb(res.properties);
                    } else {
                        setError(true);
                        setMsgError("Error, no hay conexión con el servidor!!!");
                    }
                } else {
                    setPropertiesDb(null);
                }
                setLoading(false);
            });
    }

    // ********** Obtener Historial **********
    const fetchHistorial = async () => {
        api.get(URL + HISTORIAL)
            .then((res) => {
                if (!res.error) {
                    setError(null);
                    if (res.historial) {
                        setHistorial(res.historial)
                    } else {
                        setError(true);
                        setMsgError("Error, no hay conexión con el servidor!!!");
                    }
                } else {
                    setHistorial(null);
                }
                setLoading(false);
            });
    }

    useEffect(() => {
        setLoading(true);
        fetchProperties();
        fetchHistorial();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // ********** Buscar predios por documento del propietario **********
    const findProperties = async () => {
        setLoading(true);
        const { datos } = searchProperties;
        const res = await api.get(URL + FIND + datos);
        if (res.status) {
            const { foundProperties } = res;
            setError(null);
            if (foundProperties) {
                setFoundProperties(foundProperties);
            } else {
                toastValidate({
                    msg: () =>
                        <div>
                            {res.msg} {res.status === "ok" && <b><em>{datos}</em>.</b>}
                        </div>,
                    position: "bottom-center"
                });
            }
        } else {
            setError(true);
            setMsgError("Error, no hay conexión con el servidor!!!");
        }
        setLoading(false);
    };

    useEffect(() => {
        if (searchProperties === null) return;
        findProperties();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchProperties]);

    // ********** Listar predios asociados de un usuario **********
    const fetchAssociatedProperties = async () => {
        setLoading(true);
        const user_id = payload._id;
        const res = await api.get(URL + LIST_ASSOCIATED_PROPERTIES + user_id);
        if (res.status) {
            setError(null);
            if (res.associatedProperties) {
                setAssociatedProperties(res.associatedProperties);
            }
        } else {
            setError(true);
            setMsgError("Error, no hay conexión con el servidor!!!");
        }
        setLoading(false);
    }

    useEffect(() => {
        if (!payload) return;
        fetchAssociatedProperties();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [foundProperties]);

    // ********** Limpiar busqueda **********
    useEffect(() => {
        setFoundProperties([]);
    }, [auth])

    const data = {
        propertiesDb, setPropertiesDb,
        propertyToEdit, setPropertyToEdit,
        historial, setHistorial,
        searchProperties, setSearchProperties,
        foundProperties, setFoundProperties,
        associatedProperties, setAssociatedProperties,
        loading, setLoading,
        error, setError,
        msgError, setMsgError
    }

    return (
        <PropertiesContext.Provider value={data}>
            {children}
        </PropertiesContext.Provider>
    )
}

export const usePropertiesContext = () => useContext(PropertiesContext);
export { PropertiesProvider };
