import { usePropertiesContext, useUsersContext } from "../context";

export const useHandleError = () => {
    const { usersError, isLoading: loadingUsers } = useUsersContext();
    const { propertiesError, isLoading: loadingProperties } = usePropertiesContext();

    const error = usersError || propertiesError;
    const isLoading = loadingUsers || loadingProperties;

    return { error, isLoading };
}