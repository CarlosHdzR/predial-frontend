import { http } from "../helpers/http";
import { useEffect, useState } from "react";
import { getPayload } from "../auth";
import { toastValidate } from "../tools";
import { config } from "../config";

const { URL } = config
const { FIND, FIND_ONE } = config.PREDIOS_API

export const FindPredios = () => {
    const [predios, setPredios] = useState([]);
    const [searchPredios, setSearchPredios] = useState(null);
    const [predio, setPredio] = useState(null);
    const [searchPredio, setSearchPredio] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [msgError, setMsgError] = useState();
    const payload = getPayload();
    let api = http();

    // Buscar predios por Documento del Propietario
    useEffect(() => {
        if (searchPredios === null) return;
        const fetchData = async () => {
            const { datos } = searchPredios;
            let predioUrl = URL + FIND + datos;
            setLoading(true);
            const [res] = await Promise.all([
                api.get(predioUrl),
            ]);
            const { data } = res;
            if (data) {
                setError(null)
                if (data.length > 0) {
                    setPredios(data);
                } else {
                    toastValidate({
                        msg: <p>No se encontraron resultados para el documento <b><em>{datos}</em></b>.</p>,
                        position: "bottom-center"
                    });
                }
            } else {
                setError(true);
                setMsgError("Error, no hay conexión con el servidor!!!");
            }
            setLoading(false);
        };
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchPredios]);

    const handleSearchPredios = (data) => {
        setSearchPredios(data);
    };

    // Buscar predio por Código
    useEffect(() => {
        if (searchPredio === null) return;
        const fetchData = async () => {
            const { datos } = searchPredio;
            let predioUrl = URL + FIND_ONE + datos;
            setLoading(true);
            const [res] = await Promise.all([
                api.get(predioUrl),
            ]);
            const { data } = res
            if (data) {
                setError(null);
                if (Object.keys(data).length > 0) {
                    if (data.doc_prop === payload.nro_doc) {
                        setPredio(data)
                    } else {
                        toastValidate({
                            msg: <p>No se encontraron resultados para el código <b><em>{datos}</em></b></p>,
                            position: "bottom-center"
                        })
                    }
                } else {
                    toastValidate({
                        msg: <p>No se encontraron resultados para el código <b><em>{datos}</em></b></p>,
                        position: "bottom-center"
                    })
                }
            } else {
                setError(true);
                setMsgError("Error, no hay conexión con el servidor!!!");
            }
            setLoading(false);
        };
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchPredio]);

    const handleSearchPredio = (data) => {
        setSearchPredio(data);
    };

    return {
        predios, handleSearchPredios,
        predio, handleSearchPredio,
        loading,
        error,
        msgError,
    }
}

