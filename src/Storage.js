import jwtDecode from "jwt-decode";
import {startTokenExpirationTask} from "./helpers/Common";

const USER_ID = "userId";
const USER_ROLE = "userRole";
const USER_NAME = "userName";
const AUTH_TOKEN = "authToken";
const AUTH_TOKEN_EXP = "authTokenExp";

export const saveAuthData = (dispatch, authToken) => {
    const {userId, firstName, lastName, role, exp} = jwtDecode(authToken);
    const userName = `${firstName} ${lastName}`;
    sessionStorage.setItem(USER_ID, userId);
    sessionStorage.setItem(USER_ROLE, role);
    sessionStorage.setItem(USER_NAME, userName);
    sessionStorage.setItem(AUTH_TOKEN, authToken);
    sessionStorage.setItem(AUTH_TOKEN_EXP, exp);
    startTokenExpirationTask(dispatch);
};

export const getUserId = () => {
    return sessionStorage.getItem(USER_ID);
};

export const getUserRole = () => {
    return sessionStorage.getItem(USER_ROLE);
};

export const getUserName = () => {
    return sessionStorage.getItem(USER_NAME);
};

export const getAuthToken = () => {
    return sessionStorage.getItem(AUTH_TOKEN);
};

export const getAuthTokenExp = () => {
    return sessionStorage.getItem(AUTH_TOKEN_EXP);
};

export const clearAuthData = () => {
    sessionStorage.removeItem(USER_ID);
    sessionStorage.removeItem(USER_ROLE);
    sessionStorage.removeItem(USER_NAME);
    sessionStorage.removeItem(AUTH_TOKEN);
    sessionStorage.removeItem(AUTH_TOKEN_EXP);
};