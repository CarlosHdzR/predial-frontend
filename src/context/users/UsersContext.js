import { createContext, useContext, useState, useEffect, useReducer } from "react";
import { config } from "../../config";
import { toast } from "react-toastify";
import { http } from "../../helpers/http";
import usersReducer from "./usersReducer";

const UsersContext = createContext();

const { URL } = config;
const { LIST_USERS } = config.USERS_API;

const initialState = {
    usersDb: [],
}

const UsersProvider = ({ children }) => {
    const [state, dispatch] = useReducer(usersReducer, initialState)
    const { usersDb } = state;
    
    const [userToEdit, setUserToEdit] = useState(null)
    const [usersError, setUsersError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSending, setIsSending] = useState(false);

    useEffect(() => {
        const params = {
            endpoint: URL + LIST_USERS,
            setIsLoading,
            setError: setUsersError,
        }
        const fetchUsers = async () => {
            const res = await http().get(params);
            if (res) {
                const { users, msg } = res;
                users
                    ? dispatch({ type: 'GET_ALL_USERS', payload: users })
                    : toast.info(msg);
            }
        }
        fetchUsers();
    }, []);

    const data = {
        state, dispatch, usersDb,
        userToEdit, setUserToEdit,
        usersError, isLoading,
        isSending, setIsSending
    }

    return (
        <UsersContext.Provider value={data}>
            {children}
        </UsersContext.Provider>
    )
}

const useUsersContext = () => useContext(UsersContext);
export { UsersProvider, useUsersContext };
