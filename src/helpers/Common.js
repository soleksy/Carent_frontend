import {clearAuthData, getAuthTokenExp} from "../Storage";

export const getQueryParam = (paramName) => {
    const params = new URLSearchParams(window.location.search);
    return params.get(paramName);
};

let expirationTaskHandle;
export const startTokenExpirationTask = (dispatch) => {
    const exp = getAuthTokenExp();
    if(exp) {
        if (expirationTaskHandle) {
            clearTimeout(expirationTaskHandle);
        }
        const remainingTime = new Date(exp * 1000) - Date.now();
        expirationTaskHandle = setTimeout(() => {
            clearAuthData();
            dispatch({
                modalContent: <span>Your session has expired. Please, sign in.</span>
            });
        }, remainingTime - 30 * 1000);
    }
};

export const getDifferenceInDays = (date1, date2) => {
    return Math.ceil((date2 - date1) / (1000 * 60 * 60 * 24));
};