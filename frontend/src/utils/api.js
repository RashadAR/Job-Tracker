import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['x-auth-token'] = token;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

const refreshAuthLogic = failedRequest => axios.post('/auth/refresh-token').then(tokenRefreshResponse => {
    localStorage.setItem('token', tokenRefreshResponse.data.token);
    failedRequest.response.config.headers['x-auth-token'] = tokenRefreshResponse.data.token;
    return Promise.resolve();
});

createAuthRefreshInterceptor(api, refreshAuthLogic);

export default api;