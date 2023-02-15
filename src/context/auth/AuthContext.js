import { createContext, useContext, useEffect, useReducer, useState } from "react";
import jwtDecode from "jwt-decode";
import { useUsersContext } from "../users/UsersContext";
import authReducer from "./authReducer";

const AuthContext = createContext();

const initialState = {
    token: null,
    loggedUser: null
}

const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);
    const { token, loggedUser } = state;
    
    const [isSending, setIsSending] = useState(false);
    const { usersDb } = useUsersContext();

    useEffect(() => {
        const token = localStorage.getItem("token");
        dispatch({ type: 'LOGIN', payload: token })
    }, [])

    const getAuth = () => {
        try {
            if (token) {
                return {
                    payload: jwtDecode(token),
                    auth: true
                }
            }
            return {
                payload: null,
                auth: false
            }
        } catch (error) {
            console.log(error);
        }
    };
    const { payload, auth } = getAuth();

    useEffect(() => {
        try {
            if (token) {
                const foundUser = usersDb.find((user) => user._id === payload._id);
                dispatch({ type: 'SET_LOGGED_USER', payload: foundUser })
            }
        } catch (error) {
            console.log(error);
        }
    }, [token, payload?._id, usersDb]);

    const data = {
        payload, auth, loggedUser, dispatch,
        isSending, setIsSending
    };

    return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
}

const useAuthContext = () => useContext(AuthContext);

export { AuthProvider, useAuthContext };
