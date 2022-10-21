import { usePropertiesContext } from "../context/PropertiesContext";
import { useUsersContext } from "../context/UsersContext";

export const useHandleError = () => {
    const { usersError, usersErrorMsg, isLoading: loadingUsers } = useUsersContext();
    const { propertiesError, propertiesErrorMsg, loading: loadingProperties } = usePropertiesContext();

    const error = usersError || propertiesError;
    const errorMsg = usersErrorMsg || propertiesErrorMsg;
    const isLoading = loadingUsers || loadingProperties;

    return { error, errorMsg, isLoading };
}