import { toast } from "react-toastify";

export const http = () => {
    const customFetch = async (endpoint, options) => {
        const token = localStorage.getItem("token");
        const isFormData = options.body instanceof FormData;

        options.method = options.method || "GET";

        options.body = isFormData ? options.body : JSON.stringify(options.body);
        if (!options.body) delete options.body;

        const defaultHeader = {
            "accept": "application/json",
            "content-type": "application/json",
            "authorization": `Bearer ${token}`
        };
        if (options.method === "GET" || isFormData || !options.body) delete defaultHeader["content-type"];
        if (options.method === "GET" || !token) delete defaultHeader["authorization"];

        options.headers = options.headers
            ? { ...defaultHeader, ...options.headers }
            : defaultHeader;

        const controller = new AbortController();
        options.signal = controller.signal;

        setTimeout(() => controller.abort(), 5000);

        try {
            const res = await fetch(endpoint, options);
            return res.ok
                ? res.json()
                : {
                    error: true,
                    status: res.status || "00",
                    statusText: res.statusText || "Ocurrió un error!!!",
                    msg: `${res.status} ${res.statusText}`
                };
        } catch (error) {
            return (
                {
                    error: true,
                    msg: `Error - ${error.message}`
                }
            );
        }
    };

    const get = async ({ endpoint, options = {}, setIsLoading, setError }) => {
        try {
            setIsLoading(true);
            setError(null);
            const res = await customFetch(endpoint, options);
            if (!res.error) {
                return res;
            }
            await Promise.reject(res);
        } catch (error) {
            setError({
                msg: `${error.status ? "Error -" : ""} ${error.msg}`
            });
        } finally {
            setIsLoading(false);
        }
    };

    const sendData = async (endpoint, options, setIsSending) => {
        try {
            setIsSending(true);
            const res = await customFetch(endpoint, options);
            if (!res.error) {
                return res;
            }
            await Promise.reject(res);
        } catch (error) {
            toast.error(error.msg, { toastId: "error" });
        } finally {
            setIsSending(false);
        }
    }

    const post = async ({ endpoint, options = {}, setIsSending }) => {
        options.method = "POST";
        return await sendData(endpoint, options, setIsSending)
    };

    const put = async ({ endpoint, options = {}, setIsSending }) => {
        options.method = "PUT";
        return await sendData(endpoint, options, setIsSending);
    };

    const del = async ({ endpoint, options = {}, setIsSending }) => {
        options.method = "DELETE";
        return await sendData(endpoint, options, setIsSending);
    };

    return {
        get,
        post,
        put,
        del,
    };
};
