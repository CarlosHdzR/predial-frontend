import { createContext, useContext, useEffect, useState } from "react";
import { http } from '../helpers/http';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { config } from '../config';
import { useUsersContext } from "./UsersContext";
import jwtDecode from "jwt-decode";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [loggedUser, setLoggedUser] = useState(null);
    const [isSending, setIsSending] = useState(false)
    const { usersDb } = useUsersContext();
    let { post } = http();
    const { URL } = config;
    const { LOGIN } = config.USERS_API;
    const navigate = useNavigate();

    const getAuth = () => {
        try {
            const token = localStorage.getItem("token");
            if (token) {
                return {
                    payload: jwtDecode(token), auth: true
                }
            }
            return {
                payload: null, auth: false
            }
        } catch (error) {
            console.log(error);
        }
    };
    const { payload, auth } = getAuth();

    useEffect(() => {
        try {
            if (payload) {
                const foundUser = usersDb.find((user) => user._id === payload._id);
                setLoggedUser(foundUser);
            }
        } catch (error) {
            console.log(error);
        }
    }, [payload, usersDb]);

    const login = async (form) => {
        const params = {
            endpoint: URL + LOGIN,
            options: { body: form },
            setIsSending
        }
        const res = await post(params);
        if (res) {
            localStorage.setItem("token", res.token);
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
        navigate("/login");
        toast.info("Has cerrado sesión!!!", { autoClose: 3000 });
    }

    const data = {
        payload, auth, loggedUser, isSending,
        login, logout
    };

    return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
}

export const useAuthContext = () => useContext(AuthContext);

export { AuthProvider };
