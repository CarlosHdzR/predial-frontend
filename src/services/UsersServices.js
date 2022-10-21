import { http } from '../helpers/http';
import { useNavigate } from 'react-router-dom';
import { swalConfirm } from '../tools';
import { config } from '../config';
import { useUsersContext } from '../context/UsersContext';
import { useAuthContext } from '../context/AuthContext';
import { usePropertiesContext } from '../context/PropertiesContext';
import { toast } from 'react-toastify';

const { URL } = config;
const { CREATE, REGISTER, EDIT, DELETE, CHANGE_PASSWORD,
    GET_RESET_LINK, RESET_PASSWORD, ASSOCIATE_PROPERTIES } = config.USERS_API;

const Users = () => {
    const { usersDb, setUsersDb, setIsSending } = useUsersContext();
    const { foundProperties, setFoundProperties } = usePropertiesContext();
    const { payload, logout } = useAuthContext();
    const token = localStorage.getItem("token");
    let api = http();
    const navigate = useNavigate();

    // ********** Crear Usuario **********
    const createUser = async (formData) => {
        try {
            let endpoint = URL + CREATE
            let options = {
                body: formData,
                headers: {
                    "authorization": `Bearer ${token}`
                }
            }
            setIsSending(true)
            const res = await api.post(endpoint, options);
            if (!res.error) {
                setUsersDb([...usersDb, res.user])
                toast.success(res.msg)
                return;
            }
            await Promise.reject(res);
        } catch (error) {
            toast.error(error.msg);
        } finally {
            setIsSending(false)
        }
    };

    // Registro de usuarios externos:
    const registerUser = async (user) => {
        try {
            let endpoint = URL + REGISTER;
            let options = {
                body: JSON.stringify(user),
                headers: { "content-type": "application/json" }
            }
            setIsSending(true)
            const res = await api.post(endpoint, options);
            if (!res.error) {
                setUsersDb([...usersDb, res.user])
                toast.success(res.msg)
                setTimeout(() => {
                    navigate("/login")
                }, 3000);
                return;
            }
            await Promise.reject(res);
        } catch (error) {
            toast.error(error.msg)
        } finally {
            setIsSending(false)
        }
    };

    // ********** Editar Usuario **********
    const updateUser = async (formData, user_id) => {
        try {
            let endpoint = URL + EDIT + user_id
            let options = {
                body: formData,
                headers: {
                    "authorization": `Bearer ${token}`
                }
            }
            setIsSending(true)
            const res = await api.put(endpoint, options);
            if (!res.error) {
                setUsersDb(res.users);
                toast.success(res.msg)
                navigate(payload.role === 1 ? "/admin/manage-users" : "", { replace: true })
                return;
            }
            await Promise.reject(res);
        } catch (error) {
            toast.error(error.msg);
        } finally {
            setIsSending(false)
        }
    };

    // ********** Eliminar Usuario **********
    const deleteUser = async (user) => {
        try {
            let id_number = user.param
            let user_id = user._id
            const resConfirm = await swalConfirm({
                msg: `¿Estás seguro que quieres eliminar el usuario con número de documento <b>${id_number}</b>?`,
                icon: 'warning'
            })
            if (resConfirm.isConfirmed) {
                let endpoint = URL + DELETE + user_id;
                let options = {
                    headers: {
                        "authorization": `Bearer ${token}`
                    }
                }
                const res = await api.del(endpoint, options);
                if (!res.error) {
                    setUsersDb(usersDb.filter((e) => e._id !== user_id))
                    toast.success(res.msg)
                    return;
                }
                await Promise.reject(res)
            }
        } catch (error) {
            toast.error(error.msg);
        }
    };

    const changePassword = async (user) => {
        try {
            let endpoint = URL + CHANGE_PASSWORD;
            let options = {
                body: JSON.stringify(user),
                headers: {
                    "content-type": "application/json",
                    "authorization": `Bearer ${token}`
                }
            }
            setIsSending(true)
            const res = await api.post(endpoint, options);
            if (!res.error) {
                toast.success(res.msg)
                setTimeout(() => {
                    logout();
                }, 3000);
                return;
            }
            await Promise.reject(res);
        } catch (error) {
            toast.error(error.msg);
        } finally {
            setIsSending(false);
        }
    };

    // Solicitar restablecimiento de contraseña:
    const getResetLink = async (user) => {
        try {
            let endpoint = URL + GET_RESET_LINK;
            let options = {
                body: JSON.stringify(user),
                headers: { "content-type": "application/json" }
            }
            setIsSending(true)
            const res = await api.post(endpoint, options);
            if (!res.error) {
                toast.success(res.msg)
                return
            }
            await Promise.reject(res);
        } catch (error) {
            toast.error(error.msg);
        } finally {
            setIsSending(false);
        }
    };

    // Restablecer contraseña:
    const resetPassword = async (user, token) => {
        try {
            user.sentToken = token;
            let endpoint = URL + RESET_PASSWORD;
            let options = {
                body: JSON.stringify(user),
                headers: { "content-type": "application/json" }
            }
            setIsSending(true)
            const res = await api.post(endpoint, options);
            console.log(res.error);
            if (!res.error) {
                toast.success(res.msg);
                setTimeout(() => {
                    navigate("/login")
                }, 3000);
                return;
            }
            await Promise.reject(res);
        } catch (error) {
            toast.error(error.msg);
        } finally {
            setIsSending(false);
        }
    }

    // ********** Asociar predios **********
    const associateProperty = async (user_id, property_id) => {
        try {
            let endpoint = URL + ASSOCIATE_PROPERTIES + user_id;
            let options = {
                body: JSON.stringify({ property_id }),
                headers: { "content-type": "application/json" }
            };
            setIsSending(true)
            const res = await api.put(endpoint, options);
            console.log(res.error);
            if (!res.error) {
                const newData = foundProperties.map((property) => property._id === res.associatedProperty._id ? res.associatedProperty : property)
                setFoundProperties(newData);
                toast.success(res.msg)
                return;
            }
            await Promise.reject(res);
        } catch (error) {
            toast.error(error.msg);
        } finally {
            setIsSending(false);
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
