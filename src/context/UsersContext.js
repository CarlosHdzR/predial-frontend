import { http } from "../helpers/http";
import { createContext, useContext, useState, useEffect } from "react";
import { config } from "../config";
import { toast } from "react-toastify";

const UsersContext = createContext();

const { URL } = config;
const { LIST_USERS } = config.USERS_API;

const UsersProvider = ({ children }) => {
    const [usersDb, setUsersDb] = useState([]);
    const [userToEdit, setUserToEdit] = useState(null);
    const [usersError, setUsersError] = useState(null);
    const [usersErrorMsg, setUsersErrorMsg] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSending, setIsSending] = useState(false)

    // ********** Obtener Usuarios **********
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setIsLoading(true);
                const res = await http().get(URL + LIST_USERS);
                if (!res.error) {
                    const { users, msg } = res;
                    return users ? setUsersDb(users) : toast.info(msg)
                }
                await Promise.reject(res);
            } catch (error) {
                setUsersError(true);
                setUsersErrorMsg(`${error.status ? "Users Database Error -" : ""} ${error.msg}`);
            } finally {
                setIsLoading(false);
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
