import axios from "axios";
import {getAuthToken, getUserId} from "./Storage";

const serverUrl = "http://192.168.0.81:8080";
const signInUrl = `/users/auth`;
const signUpUrl = `/users/register`;
const usersUrl = `/users`;
const userProfileUrl = `/self`;
const carsUrl = `/car`;

export const signIn = (email, password) => {
    const authHeader = `Basic ${btoa(`${email}:${password}`)}`;
    return axios.post(signInUrl, {}, {
        headers: {
            "Authorization": authHeader
        }
    });
};

export const signUp = (email, firstName, lastName, birthdate, password, confirmPassword) => {
    return axios.post(signUpUrl, {
        email,
        firstName,
        lastName,
        dateOfBirth: birthdate,
        password,
        confirmPassword
    }, {});
};

export const getCurrentUserData = () => {
    const authToken = `Bearer ${getAuthToken()}`;
    const userId = getUserId();
    if (!userId) {
        return new Promise((resolve, reject) => reject({message: "Sign in required"}));
    }
    const userDataUrl = `${userProfileUrl}`;
    return axios.get(userDataUrl, {
        headers: {
            "Authorization": authToken
        }
    });
};

export const getCars = () => {
    return axios.get(carsUrl, {});
};
