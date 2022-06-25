import { http } from '../helpers/http';
import { getToken } from '../auth';
import { useNavigate } from 'react-router-dom';
import { toastLoading, toastUpdate, swalConfirm } from '../tools';
import { config } from '../config';

const { URL } = config
const { CREATE, EDIT, DELETE } = config.PREDIOS_API

export const CrudPredios = (prediosDb, setPrediosDb, usersDb, setUsersDb, historial, setHistorial) => {
    let api = http();
    const token = getToken()
    const navigate = useNavigate()

    // ********** Crear Predio **********
    const createPredio = async (predio) => {
        let endpoint = URL + CREATE
        let options = {
            body: JSON.stringify(predio),
            headers: {
                "content-type": "application/json",
                "authorization": `Bearer ${token}`
            }
        }
        const loading = toastLoading()
        const res = await api.post(endpoint, options);
        if (!res.status) {
            toastUpdate(
                loading,
                { msg: "Error, no hay conexión con el servidor!!!", type: "error", theme: "colored", autoClose: false })
        } else {
            if (res.predio) {
                setPrediosDb([...prediosDb, res.predio])
                toastUpdate(loading, { msg: res.msg, type: "success" })
                let newData = usersDb.map((e) => (e._id === res.user._id ? res.user : e))
                setUsersDb(newData)
                setHistorial([...historial, res.historial])
            } else {
                toastUpdate(loading, { msg: res.msg, type: "error" })
            }
        }
    };

    // ********** Editar Predio **********
    const updatePredio = async (predio, _id) => {
        let vrPredio = predio.valor_predio.replace(/[$.]/g, '')
        let vrPredial = vrPredio * 0.01
        predio.valor_predial = Math.round(vrPredial)
        let endpoint = URL + EDIT + _id
        let options = {
            body: JSON.stringify(predio),
            headers: {
                "content-type": "application/json",
                "authorization": `Bearer ${token}`
            }
        }
        const loading = toastLoading()
        const res = await api.put(endpoint, options);
        if (!res.status) {
            toastUpdate(
                loading,
                { msg: "Error, no hay conexión con el servidor!!!", type: "error", theme: "colored", autoClose: false })
        } else {
            if (res.status === "ok") {
                setPrediosDb(res.predios);
                setUsersDb(res.users);
                setHistorial([...historial, res.historial])
                toastUpdate(loading, { msg: res.msg, type: "success" })
                navigate("/admin/manage-predios", { replace: true })
            } else {
                toastUpdate(loading, { msg: res.msg, type: "error" })
            }
        }
    };

    // ********** Eliminar Predio **********
    const deletePredio = (predio) => {
        let codigo = predio.param
        let _id = predio._id
        swalConfirm({
            msg: `¿Estás seguro que quieres eliminar el predio con id <b>${codigo}</b>?`,
            icon: 'warning'
        }).then(res => {
            if (res.isConfirmed) {
                let endpoint = URL + DELETE + _id
                let options = {
                    headers: {
                        "authorization": `Bearer ${token}`
                    }
                }
                const loading = toastLoading()
                api.del(endpoint, options).then((res) => {
                    if (!res.status) {
                        toastUpdate(
                            loading,
                            { msg: "Error, no hay conexión con el servidor!!!", type: "error", theme: "colored", autoClose: false })
                    } else {
                        if (res.status === "ok") {
                            setPrediosDb(prediosDb.filter((e) => e._id !== _id))
                            setUsersDb(usersDb.map((e) => (e._id === res.user._id ? res.user : e)))
                            setHistorial([...historial, res.historial])
                            toastUpdate(loading, { msg: res.msg, type: "success" })
                        } else {
                            toastUpdate(loading, { msg: res.msg, type: "error" })
                        }
                    }
                });
            }
        });
    };

    return {
        createPredio,
        updatePredio,
        deletePredio
    }
}