import { AuthResponse } from "@/types/authResponse";
import axios from "axios";

const $api = axios.create({
    withCredentials: true,
    baseURL: import.meta.env.VITE_API_URL,
});

$api.interceptors.request.use((config) => {
    config.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
    return config;
});

$api.interceptors.response.use(
    (config) => {
        return config;
    },
    async (error) => {
        const originalRequest = error.config;
        if (
            error.response.status === 401 &&
            error.config &&
            !error.config._isRetry
        ) {
            originalRequest._isRetry = true;
            try {
                const response = await axios.get<AuthResponse>(
                    `${import.meta.env.VITE_API_URL}/refresh`,
                    { withCredentials: true }
                );
                localStorage.setItem("token", response.data.accessToken);
                return $api.request(originalRequest);
            } catch (e) {
                throw new Error("Пользователь не авторизован!");
            }
        }
        return Promise.reject(error);
    }
);

export default $api;
