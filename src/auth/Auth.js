import { getPayload } from './getPayload';
import { http } from '../helpers/http';
import { useNavigate } from 'react-router-dom';
import { toastLoading, toastUpdate } from '../tools';
import { toast } from 'react-toastify';
import { config } from '../config';

export const Auth = () => {
    let api = http();
    const navigate = useNavigate()
    const { URL } = config
    const { LOGIN } = config.USERS_API

    const auth = () => {
        let resp = false;
        try {
            if (localStorage.getItem("token")) {
                const payload = getPayload();
                if (payload._id)
                    resp = true;
            }
        } catch (error) {
            console.log(error)
        }
        return resp;
    }

    const login = async (form) => {
        let endpoint = URL + LOGIN;
        let options = {
            body: JSON.stringify(form),
            headers: { "content-type": "application/json" },
        };
        const loading = toastLoading()
        const res = await api.post(endpoint, options)
        if (!res.status) {
            toastUpdate(
                loading,
                { msg: "No hay conexión con el servidor!!!", type: "error", theme: "colored", autoClose: false })
        } else {
            if (res.status === "ok") {
                localStorage.setItem("token", res.token);
                navigate(res.path)
                toastUpdate(loading, {
                    msg: () =>
                        <div>
                            Bienvenid@, <b>{res.user}</b>!!!
                        </div>,
                    type: "success", autoClose: 3000
                });
            } else {
                toastUpdate(loading, { msg: res.msg, type: "error" })
            }
        }
    }

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login")
        toast.info("Has cerrado sesión!!!", { autoClose: 3000 })
    }

    return {
        auth,
        login,
        logout,
    }
}
