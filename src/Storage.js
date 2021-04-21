export const saveAuthData = (username, authToken) => {
    localStorage.setItem("username", username);
    localStorage.setItem("authToken", authToken);
};

export const getUsername = () => {
    return localStorage.getItem("username");
};

export const getAuthToken = () => {
    return localStorage.getItem("authToken");
};

export const clearAuthData = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("authToken");
};