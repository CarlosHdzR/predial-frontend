import { createContext, useContext, useState, useEffect } from "react";
import { config } from "../config";
import { toast } from "react-toastify";
import { http } from "../helpers/http";

const UsersContext = createContext();

const { URL } = config;
const { LIST_USERS } = config.USERS_API;

const UsersProvider = ({ children }) => {
    const [usersDb, setUsersDb] = useState([]);
    const [userToEdit, setUserToEdit] = useState(null);
    const [usersError, setUsersError] = useState(null);
    const [usersErrorMsg, setUsersErrorMsg] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSending, setIsSending] = useState(false);

    // ********** Obtener Usuarios **********
    useEffect(() => {
        const params = {
            endpoint: URL + LIST_USERS,
            setIsLoading,
            setError: setUsersError,
            setErrorMsg: setUsersErrorMsg
        }
        const fetchUsers = async () => {
            const res = await http().get(params);
            if (res) {
                const { users, msg } = res;
                users ? setUsersDb(users) : toast.info(msg)
            }
        }
        fetchUsers();
    }, []);

    const data = {
        usersDb, setUsersDb,
        userToEdit, setUserToEdit,
        usersError, usersErrorMsg,
        isLoading, isSending, setIsSending
    }

    return (
        <UsersContext.Provider value={data}>
            {children}
        </UsersContext.Provider>
    )
}

export const useUsersContext = () => useContext(UsersContext);
export { UsersProvider };
