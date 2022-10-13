import { http } from "../helpers/http";
import { createContext, useContext, useState, useEffect } from "react";
import { config } from "../config";

const UsersContext = createContext();

const { URL } = config;
const { LIST_USERS } = config.USERS_API;

const UsersProvider = ({ children }) => {
    const [usersDb, setUsersDb] = useState([]);
    const [userToEdit, setUserToEdit] = useState(null);
    const [error, setError] = useState(null);
    const [msgError, setMsgError] = useState(null);
    const [loading, setLoading] = useState(false);
    const api = http();

    // ********** Obtener Usuarios **********
    const fetchUsers = async () => {
        setLoading(true);
        await api.get(URL + LIST_USERS)
            .then((res) => {
                if (!res.error) {
                    setError(null);
                    if (res.users) {
                        setUsersDb(res.users);
                    } else {
                        setError(true);
                        setMsgError("Error, no hay conexión con el servidor!!!");
                    }
                } else {
                    setUsersDb(null);
                }
                setLoading(false);
            });
    }

    useEffect(() => {
        fetchUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const data = {
        usersDb, setUsersDb,
        userToEdit, setUserToEdit,
        error, msgError, loading
    }

    return (
        <UsersContext.Provider value={data}>
            {children}
        </UsersContext.Provider>
    )
}

export const useUsersContext = () => useContext(UsersContext);
export { UsersProvider };
