import { http } from '../helpers/http';
import { useNavigate } from 'react-router-dom';
import { toastLoading, toastUpdate, swalConfirm } from '../tools';
import { config } from '../config';
import { useUsersContext } from '../context/UsersContext';
import { useAuthContext } from '../context/AuthContext';
import { usePropertiesContext } from '../context/PropertiesContext';

const { URL } = config;
const { CREATE, REGISTER, EDIT, DELETE, CHANGE_PASSWORD,
    GET_RESET_LINK, RESET_PASSWORD, ASSOCIATE_PROPERTIES } = config.USERS_API;

const Users = () => {
    const { usersDb, setUsersDb } = useUsersContext();
    const { foundProperties, setFoundProperties } = usePropertiesContext();
    const { payload, logout } = useAuthContext();
    const token = localStorage.getItem("token");
    let api = http();
    const navigate = useNavigate();

    // ********** Crear Usuario **********
    const createUser = async (formData) => {
        let endpoint = URL + CREATE
        let options = {
            body: formData,
            headers: {
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
            if (res.user) {
                setUsersDb([...usersDb, res.user])
                toastUpdate(loading, { msg: res.msg, type: "success" })
            } else {
                toastUpdate(loading, { msg: res.msg, type: "error" })
            }
        }
    };

    // Registro de usuarios externos:
    const registerUser = async (user) => {
        let endpoint = URL + REGISTER;
        let options = {
            body: JSON.stringify(user),
            headers: { "content-type": "application/json" }
        }
        const loading = toastLoading()
        const res = await api.post(endpoint, options);
        if (!res.status) {
            toastUpdate(
                loading,
                { msg: "Error, no hay conexión con el servidor!!!", type: "error", theme: "colored", autoClose: false })
        } else {
            if (res.user) {
                setUsersDb([...usersDb, res.user])
                toastUpdate(loading, { msg: res.msg, type: "success", autoClose: 3000 })
                setTimeout(() => {
                    navigate("/login")
                }, 3000);
            } else {
                toastUpdate(loading, { msg: res.msg, type: "error" })
            }
        }
    };

    // ********** Editar Usuario **********
    const updateUser = async (formData, user_id) => {
        let endpoint = URL + EDIT + user_id
        let options = {
            body: formData,
            headers: {
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
                setUsersDb(res.users);
                toastUpdate(loading, { msg: res.msg, type: "success" })
                navigate(payload.role === 1 ? "/admin/manage-users" : "", { replace: true })
            } else {
                toastUpdate(loading, { msg: res.msg, type: "error" })
            }
        }
    };

    // ********** Eliminar Usuario **********
    const deleteUser = (user) => {
        let id_number = user.param
        let user_id = user._id
        swalConfirm({
            msg: `¿Estás seguro que quieres eliminar el usuario con número de documento <b>${id_number}</b>?`,
            icon: 'warning'
        }).then((res) => {
            if (res.isConfirmed) {
                let endpoint = URL + DELETE + user_id;
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
                            setUsersDb(usersDb.filter((e) => e._id !== user_id))
                            toastUpdate(loading, { msg: res.msg, type: "success" })
                        } else {
                            toastUpdate(loading, { msg: res.msg, type: "error" })
                        }
                    }
                })
            }
        })
    };

    const changePassword = async (user) => {
        let endpoint = URL + CHANGE_PASSWORD;
        let options = {
            body: JSON.stringify(user),
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
            if (res.status === "ok") {
                toastUpdate(loading, { msg: res.msg, type: "success", autoClose: 3000 })
                setTimeout(() => {
                    logout();
                }, 3000);
            } else {
                toastUpdate(loading, { msg: res.msg, type: "error" })
            }
        }
    };

    // Solicitar restablecimiento de contraseña:
    const getResetLink = async (user) => {
        let endpoint = URL + GET_RESET_LINK;
        let options = {
            body: JSON.stringify(user),
            headers: { "content-type": "application/json" }
        }
        const loading = toastLoading()
        const res = await api.post(endpoint, options);
        if (!res.status) {
            toastUpdate(
                loading,
                { msg: "Error, no hay conexión con el servidor!!!", type: "error", theme: "colored", autoClose: false })
        } else {
            if (res.status === "ok") {
                toastUpdate(loading, { msg: res.msg, type: "info" })
            } else {
                toastUpdate(loading, { msg: res.msg, type: "error" })
            }
        }
    };

    // Restablecer contraseña:
    const resetPassword = async (user, token) => {
        user.sentToken = token;
        let endpoint = URL + RESET_PASSWORD;
        let options = {
            body: JSON.stringify(user),
            headers: { "content-type": "application/json" }
        }
        const loading = toastLoading()
        const res = await api.post(endpoint, options);
        if (!res.status) {
            toastUpdate(
                loading,
                { msg: "Error, no hay conexión con el servidor!!!", type: "error", theme: "colored", autoClose: false })
        } else {
            if (res.status === "ok") {
                toastUpdate(loading, { msg: res.msg, type: "success", autoClose: 3000 })
                setTimeout(() => {
                    navigate("/login")
                }, 3000);
            } else {
                toastUpdate(loading, { msg: res.msg, type: "error" })
            }
        }
    }

    // ********** Asociar predios **********
    const associateProperty = async (user_id, property_id) => {
        let endpoint = URL + ASSOCIATE_PROPERTIES + user_id;
        let options = {
            body: JSON.stringify({ property_id }),
            headers: { "content-type": "application/json" }
        };
        const loading = toastLoading()
        const res = await api.put(endpoint, options);
        if (!res.status) {
            toastUpdate(
                loading,
                { msg: "Error, no hay conexión con el servidor!!!", type: "error", theme: "colored", autoClose: false })
        } else {
            if (res.status === "ok") {
                const newData = foundProperties.map((property) => property._id === res.associatedProperty._id ? res.associatedProperty : property)
                setFoundProperties(newData);
                toastUpdate(loading, { msg: res.msg, type: "success" })
            } else {
                toastUpdate(loading, { msg: res.msg, type: "error" })
            }
        }
    }

    return {
        createUser,
        registerUser,
        updateUser,
        deleteUser,
        changePassword,
        getResetLink,
        resetPassword,
        associateProperty
    }
}

export default Users;
