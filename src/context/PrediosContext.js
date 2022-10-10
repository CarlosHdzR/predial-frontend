import { createContext, useContext, useEffect, useState } from "react";
import { config } from "../config";
import { http } from "../helpers/http";
import { toastValidate } from "../tools";
import { useAuthContext } from "./AuthContext";

const PrediosContext = createContext();

const { URL } = config;
const { LIST_PREDIOS, HISTORIAL, FIND, LIST_ASSOCIATED_PREDIOS } = config.PREDIOS_API;

const PrediosProvider = ({ children }) => {
    const [prediosDb, setPrediosDb] = useState([]);
    const [predioToEdit, setPredioToEdit] = useState(null);
    const [historial, setHistorial] = useState([]);
    const [searchPredios, setSearchPredios] = useState(null);
    const [foundPredios, setFoundPredios] = useState([]);
    const [associatedPredios, setAssociatedPredios] = useState([])
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [msgError, setMsgError] = useState(null);
    const api = http();
    const { payload, auth } = useAuthContext();

    const fetchPredios = async () => {
        await api.get(URL + LIST_PREDIOS)
            .then((res) => {
                if (!res.error) {
                    setError(null);
                    if (res.properties) {
                        setPrediosDb(res.properties);
                    } else {
                        setError(true);
                        setMsgError("Error, no hay conexión con el servidor!!!");
                    }
                } else {
                    setPrediosDb(null);
                }
                setLoading(false);
            });
    }

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
        fetchPredios();
        fetchHistorial();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Buscar predios por documento del propietario
    const findPredios = async () => {
        setLoading(true);
        const { datos } = searchPredios;
        let predioUrl = URL + FIND + datos;
        const res = await api.get(predioUrl);
        if (res.status) {
            const { foundProperties } = res;
            setError(null);
            if (foundProperties) {
                setFoundPredios(foundProperties);
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
        if (searchPredios === null) return;
        findPredios();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchPredios]);

    // Listar predios asociados de un usuario
    const fetchAssociatedPredios = async () => {
        setLoading(true);
        const user_id = payload._id;
        const res = await api.get(`${URL}${LIST_ASSOCIATED_PREDIOS}${user_id}`);
        if (res.status) {
            setError(null);
            if (res.associatedProperties) {
                setAssociatedPredios(res.associatedProperties);
            }
        } else {
            setError(true);
            setMsgError("Error, no hay conexión con el servidor!!!");
        }
        setLoading(false);
    }

    useEffect(() => {
        if (!payload) return;
        fetchAssociatedPredios();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [foundPredios]);

    // Limpiar busqueda
    useEffect(() => {
        setFoundPredios([]);
    }, [auth])

    const data = {
        prediosDb, setPrediosDb,
        predioToEdit, setPredioToEdit,
        historial, setHistorial,
        searchPredios, setSearchPredios,
        foundPredios, setFoundPredios,
        associatedPredios, setAssociatedPredios,
        loading, setLoading,
        error, setError,
        msgError, setMsgError
    }

    return (
        <PrediosContext.Provider value={data}>
            {children}
        </PrediosContext.Provider>
    )
}

export const usePrediosContext = () => useContext(PrediosContext);
export { PrediosProvider };
