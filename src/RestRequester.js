import axios from "axios";

const signInUrl = "https://carentserverside.herokuapp.com/users/auth";

export const signIn = (username, password) => {
    const authHeader = `Basic ${btoa(`${username}:${password}`)}`;
    return axios.post(signInUrl, {}, {
        headers: {
            "Authorization" : authHeader
        }
    });
}