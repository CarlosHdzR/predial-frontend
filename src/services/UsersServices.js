import { http } from '../helpers/http';
import { useNavigate } from 'react-router-dom';
import { swalConfirm } from '../tools';
import { config } from '../config';
import { useAuthContext, useUsersContext } from '../context';
import { toast } from 'react-toastify';

const { URL } = config;
const { CREATE, REGISTER, EDIT, DELETE } = config.USERS_API;

const Users = () => {
    const { dispatch, usersDb, setIsSending } = useUsersContext();
    const { payload } = useAuthContext();
    let { post, put } = http();
    const navigate = useNavigate();

    const createUser = async (formData) => {
        const params = {
            endpoint: URL + CREATE,
            options: { body: formData },
            setIsSending
        }
        const res = await post(params);
        if (res) {
            dispatch({ type: 'CREATE_USER', payload: res.user })
            toast.success(res.msg)
        }
    };

    const registerUser = async (user) => {
        const params = {
            endpoint: URL + REGISTER,
            options: { body: user },
            setIsSending
        }
        const res = await post(params);
        if (res) {
            dispatch({ type: 'REGISTER_USER', payload: res.user })
            toast.success(res.msg)
            navigate("/login")
        }
    };

    const updateUser = async (formData, user_id) => {
        const params = {
            endpoint: URL + EDIT + user_id,
            options: { body: formData },
            setIsSending
        }
        const res = await put(params);
        if (res) {
            dispatch({ type: 'UPDATE_USER', payload: res.users })
            toast.success(res.msg)
            navigate(payload.role === 1 ? "/admin/manage-users" : "", { replace: true })
        }
    };

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
                const newData = usersDb.filter((e) => e._id !== user_id);
                dispatch({ type: 'DELETE_USER', payload: newData })
                toast.success(res.msg)
            }
        }
    };

    return {
        createUser,
        registerUser,
        updateUser,
        deleteUser,
    }
}

export default Users;
