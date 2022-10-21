export const http = () => {
    const customFetch = (endpoint, options) => {
        const defaultHeader = {
            accept: "application/json",
        };

        const controller = new AbortController();
        options.signal = controller.signal;

        options.method = options.method || "GET";
        options.headers = options.headers
            ? { ...defaultHeader, ...options.headers }
            : defaultHeader;

        setTimeout(() => controller.abort(), 3000);

        return fetch(endpoint, options)
            .then((res) =>
                res.ok
                    ? res.json()
                    : {
                        error: true,
                        status: res.status || "00",
                        statusText: res.statusText || "Ocurrió un error!!!",
                        msg: `${res.status} ${res.statusText}`
                    }
            )
            .catch((error) => (
                {
                    error: true,
                    msg: `Server error - ${error.message} - Try it later!`
                }
            ));
    };

    const get = (url, options = {}) => customFetch(url, options);

    const post = (url, options = {}) => {
        options.method = "POST";
        return customFetch(url, options);
    };

    const put = (url, options = {}) => {
        options.method = "PUT";
        return customFetch(url, options);
    };

    const del = (url, options = {}) => {
        options.method = "DELETE";
        return customFetch(url, options);
    };

    return {
        get,
        post,
        put,
        del,
    };
};
