import axios from 'axios';

export const API_URL = 'http://127.0.0.1:8000/';


function isTokenExpired(token) {
    if (!token.includes('.')) {
        return false;
    }
    const payloadBase64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    const decodedJson = atob(payloadBase64);
    const decoded = JSON.parse(decodedJson);
    const exp = decoded.exp * 1000;
    const now = new Date();
    const expired = now.getTime() > exp;
    return expired;
}

const axiosInstance = axios.create({
    baseURL: API_URL,
});

function redirectToLogin() {
    window.location.href = '/'; 
}

axiosInstance.interceptors.request.use(
    config => {
        const user = JSON.parse(localStorage.getItem('user'));
        const token = user?.access_token;
        if (token) {
            if (isTokenExpired(token)) {
                console.log("Token expirado. Redirecionando para login.");
                redirectToLogin();
                return Promise.reject("Token expirado");
            } else {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
