import axios from "axios";
import {getAuthToken, getUserId} from "./Storage";

const serverUrl = "http://192.168.0.81:8080";
const usersUrl = `${serverUrl}/users`;
const signInUrl = `${usersUrl}/auth`;
const signUpUrl = `${usersUrl}/register`;
const userProfileUrl = `${usersUrl}/self`;
const editProfileUrl = `${userProfileUrl}/modify`;
const signOutUrl = `${userProfileUrl}/logout`;
const carsUrl = `${serverUrl}/car`;

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

export const signOut = () => {
    return axios.post(signOutUrl, {}, {headers: getAuthHeader()});
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

export const editProfile = (email, firstName, lastName, birthdate) => {
    return axios.put(editProfileUrl, {
        email,
        firstName,
        lastName,
        dateOfBirth: birthdate
    }, {headers: getAuthHeader()});
};

const getAuthHeader = () => {
    return {
        "Authorization": `Bearer ${getAuthToken()}`
    };
};