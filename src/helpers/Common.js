import {clearAuthData} from "../Storage";

export const getQueryParam = (paramName) => {
    const params = new URLSearchParams(window.location.search);
    return params.get(paramName);
};

let expirationTaskHandle;
export const startTokenExpirationTask = (dispatch, iat, exp) => {
    if(expirationTaskHandle) {
        clearTimeout(expirationTaskHandle);
    }

    const remainingTime = exp - iat;
    expirationTaskHandle = setTimeout(() => {
        clearAuthData();
        dispatch({
            modalContent: <span>Your session has expired. Please, sign in.</span>
        });
    }, remainingTime * 1000);
};