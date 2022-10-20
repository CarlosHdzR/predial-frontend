import { usePropertiesContext } from "../context/PropertiesContext";
import { useUsersContext } from "../context/UsersContext";

export const useHandleError = () => {
    const { usersError, usersErrorMsg, loading: loadingUsers } = useUsersContext();
    const { propertiesError, propertiesErrorMsg, loading: loadingProperties } = usePropertiesContext();

    const error = usersError || propertiesError;
    const errorMsg = usersErrorMsg || propertiesErrorMsg;
    const loading = loadingUsers || loadingProperties;

    return { error, errorMsg, loading };
}