import { useEffect, useState } from "react";
import { http } from "../helpers/http";
import { config } from "../config";

const { URL } = config
const { LIST_USERS } = config.USERS_API
const { LIST_PREDIOS, HISTORIAL } = config.PREDIOS_API

export const GetData = () => {
    const [usersDb, setUsersDb] = useState([])
    const [prediosDb, setPrediosDb] = useState([])
    const [historial, setHistorial] = useState([])
    const [error, setError] = useState(null);
    const [msgError, setMsgError] = useState(null);
    const [loading, setLoading] = useState(false);
    const api = http()

    // ********** Obtener Usuarios **********
    useEffect(() => {
        setLoading(true);
        api.get(URL + LIST_USERS)
            .then((res) => {
                if (!res.error) {
                    setError(null);
                    if (res.users) {
                        setUsersDb(res.users);
                    } else {
                        setError(true);
                        setMsgError("Error, no hay conexión con el servidor!!!");
                    }
                } else {
                    setUsersDb(null);
                }
                setLoading(false);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // ********** Obtener Predios **********
    useEffect(() => {
        setLoading(true);
        api.get(URL + LIST_PREDIOS)
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

    return {
        usersDb, setUsersDb,
        prediosDb, setPrediosDb,
        historial, setHistorial,
        error,
        msgError,
        loading
    }
}