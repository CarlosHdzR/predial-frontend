import { createContext, useContext, useEffect, useState } from "react";
import { config } from "../config";
import { http } from "../helpers/http";
import { toastValidate } from "../tools";
import { useAuthContext } from "./AuthContext";

const PrediosContext = createContext();

const { URL } = config;
const { LIST_PREDIOS, HISTORIAL, FIND, FIND_ONE } = config.PREDIOS_API;

const PrediosProvider = ({ children }) => {
    const [prediosDb, setPrediosDb] = useState([]);
    const [predioToEdit, setPredioToEdit] = useState(null);
    const [historial, setHistorial] = useState([]);
    const [searchPredios, setSearchPredios] = useState(null);
    const [foundPredios, setFoundPredios] = useState([]);
    const [foundPredio, setFoundPredio] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [errorFindingPredios, setErrorFindingPredios] = useState(null)
    const [msgError, setMsgError] = useState(null);
    const api = http();
    const { payload, auth } = useAuthContext();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await api.get(URL + LIST_PREDIOS)
                .then((res) => {
                    if (!res.error) {
                        setError(null);
                        if (res.predios) {
                            setPrediosDb(res.predios);
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
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setLoading(true);
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (searchPredios === null) return;
        const fetchData = async () => {
            setLoading(true);
            const { datos } = searchPredios;
            let API = datos.includes("PD") ? FIND_ONE : FIND;
            let predioUrl = URL + API + datos;
            const [res] = await Promise.all([
                api.get(predioUrl),
            ]);
            const { data } = res;
            if (data) {
                setErrorFindingPredios(null);
                if (Array.isArray(data)) {
                    if (data.length > 0) {
                        setFoundPredios(data);
                    } else {
                        toastValidate({
                            msg: <p>No se encontraron resultados para el documento <b><em>{datos}</em></b>.</p>,
                            position: "bottom-center"
                        });
                    }
                } else {
                    if (Object.keys(data).length > 0 && data.doc_prop === payload.nro_doc) {
                        setFoundPredio(data);
                    } else {
                        toastValidate({
                            msg: <p>No se encontraron resultados para el código <b><em>{datos}</em></b></p>,
                            position: "bottom-center"
                        })
                    }
                }
            } else {
                setErrorFindingPredios(true);
                setMsgError("Error, no hay conexión con el servidor!!!");
            }
            setLoading(false);
        };
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchPredios]);

    useEffect(() => {
        setFoundPredios([]);
        setFoundPredio(null);
    }, [auth])

    const data = {
        prediosDb, setPrediosDb,
        predioToEdit, setPredioToEdit,
        historial, setHistorial,
        searchPredios, setSearchPredios,
        foundPredios, setFoundPredios,
        foundPredio, setFoundPredio,
        loading, setLoading,
        error, setError,
        errorFindingPredios, setErrorFindingPredios,
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
