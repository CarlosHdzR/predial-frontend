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
    let { post, put } = http();
    const navigate = useNavigate();

    // ********** Crear Usuario **********
    const createUser = async (formData) => {
        const params = {
            endpoint: URL + CREATE,
            options: { body: formData },
            setIsSending
        }
        const res = await post(params);
        if (res) {
            setUsersDb([...usersDb, res.user])
            toast.success(res.msg)
        }
    };

    // Registro de usuarios externos:
    const registerUser = async (user) => {
        const params = {
            endpoint: URL + REGISTER,
            options: { body: user },
            setIsSending
        }
        const res = await post(params);
        if (res) {
            setUsersDb([...usersDb, res.user])
            toast.success(res.msg)
            setTimeout(() => {
                navigate("/login")
            }, 3000);
        }
    };

    // ********** Editar Usuario **********
    const updateUser = async (formData, user_id) => {
        const params = {
            endpoint: URL + EDIT + user_id,
            options: { body: formData },
            setIsSending
        }
        const res = await put(params);
        if (res) {
            setUsersDb(res.users);
            toast.success(res.msg)
            navigate(payload.role === 1 ? "/admin/manage-users" : "", { replace: true })
        }
    };

    // ********** Eliminar Usuario **********
    const deleteUser = async (user) => {
        let id_number = user.param
        let user_id = user._id
        const resConfirm = await swalConfirm({
            msg: `¿Estás seguro que quieres eliminar el usuario con número de documento <b>${id_number}</b>?`,
            icon: 'warning'
        })
        if (resConfirm.isConfirmed) {
            const params = {
                endpoint: URL + DELETE + user_id,
                setIsSending
            }
            const res = await put(params);
            if (res) {
                setUsersDb(usersDb.filter((e) => e._id !== user_id))
                toast.success(res.msg)
            }
        }
    };

    const changePassword = async (user) => {
        const user_id = payload._id;
        const params = {
            endpoint: URL + CHANGE_PASSWORD + user_id,
            options: { body: user },
            setIsSending
        }
        const res = await put(params);
        if (res) {
            toast.success(res.msg)
            setTimeout(() => {
                logout();
            }, 3000);
        }
    };

    // Solicitar restablecimiento de contraseña:
    const getResetLink = async (user) => {
        const params = {
            endpoint: URL + GET_RESET_LINK,
            options: { body: user },
            setIsSending
        }
        const res = await put(params);
        if (res) {
            toast.success(res.msg)
        }
    };

    // Restablecer contraseña:
    const resetPassword = async (user, token) => {
        user.sentToken = token;
        const params = {
            endpoint: URL + RESET_PASSWORD,
            options: { body: user },
            setIsSending
        }
        const res = await put(params);
        if (res) {
            toast.success(res.msg);
            setTimeout(() => {
                navigate("/login")
            }, 3000);
        }
    }

    // ********** Asociar predios **********
    const associateProperty = async (user_id, property_id) => {
        const params = {
            endpoint: URL + ASSOCIATE_PROPERTIES + user_id,
            options: { body: { property_id } },
            setIsSending
        }
        const res = await put(params);
        if (res) {
            const newData = foundProperties.map((property) => property._id === res.associatedProperty._id ? res.associatedProperty : property)
            setFoundProperties(newData);
            toast.success(res.msg)
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