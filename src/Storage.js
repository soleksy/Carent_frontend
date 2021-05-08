const USER_ID = "userId";
const USER_NAME = "userName";
const AUTH_TOKEN = "authToken";

export const saveAuthData = (userId, userName, authToken) => {
    sessionStorage.setItem(USER_ID, userId);
    sessionStorage.setItem(USER_NAME, userName);
    sessionStorage.setItem(AUTH_TOKEN, authToken);
};

export const getUserId = () => {
    return sessionStorage.getItem(USER_ID);
};

export const getUserName = () => {
    return sessionStorage.getItem(USER_NAME);
};

export const getAuthToken = () => {
    return sessionStorage.getItem(AUTH_TOKEN);
};

export const clearAuthData = () => {
    sessionStorage.removeItem(USER_ID);
    sessionStorage.removeItem(USER_NAME);
    sessionStorage.removeItem(AUTH_TOKEN);
};