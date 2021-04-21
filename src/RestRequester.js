import axios from "axios";

const signInUrl = "http://localhost:8080/test/auth";

export const signIn = (username, password) => {
    const authHeader = `Basic ${btoa(`${username}:${password}`)}`;
    return axios.post(signInUrl, {}, {
        headers: {
            "Authorization" : authHeader
        }
    });
}