import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { config } from "../config";
import { useAuthContext } from "../context";
import { http } from "../helpers/http";

const { LOGIN, CHANGE_PASSWORD, GET_RESET_LINK, RESET_PASSWORD } = config.USERS_API;

const Auth = () => {
    let { post, put } = http();
    const { URL } = config;
    const navigate = useNavigate();
    const { dispatch, payload, setIsSending } = useAuthContext();

    const login = async (form) => {
        const params = {
            endpoint: URL + LOGIN,
            options: { body: form },
            setIsSending
        }
        const res = await post(params);
        if (res) {
            localStorage.setItem("token", res.token);
            const token = localStorage.getItem("token");
            dispatch({ type: 'LOGIN', payload: token })
            const { role, name } = res.user;
            let path = role === 3 ? "/user-ext/home" : "/admin/dashboard";
            navigate(path);
            toast.success(
                <div>
                    Bienvenid@, <b>{name}</b>!!!
                </div>,
                { autoClose: 3000 }
            );
        }
    }

    const logout = () => {
        localStorage.removeItem("token");
        dispatch({ type: 'LOGOUT'})
        navigate("/login");
        toast.info("Has cerrado sesión!!!", { autoClose: 3000 });
    }

    const changePassword = async (user) => {
        const user_id = payload._id;
        const params = {
            endpoint: URL + CHANGE_PASSWORD + user_id,
            options: { body: user },
            setIsSending
        }
        const res = await put(params);
        if (res) {
            toast.success(res.msg);
            logout();
        }
    };

    const getResetLink = async (user) => {
        const params = {
            endpoint: URL + GET_RESET_LINK,
            options: { body: user },
            setIsSending
        }
        const res = await put(params);
        if (res) {
            toast.info(res.msg);
            navigate("/login");
        }
    };

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
            navigate("/login");
        }
    };

    return {
        login,
        logout,
        changePassword,
        getResetLink,
        resetPassword
    }
}

export default Auth;