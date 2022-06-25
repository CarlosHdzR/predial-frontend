import jwtDecode from "jwt-decode";

export function getPayload() {
    try {
        const token = localStorage.getItem("token");
        if (token) {
            const payload = jwtDecode(token);
            return payload;
        } 
    } catch (error) {
        console.log(error)
    }
}