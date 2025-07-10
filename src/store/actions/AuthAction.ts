import AuthService from "@/services/AuthService";
import { AppDispatch } from "..";
import axios, { AxiosError } from "axios";
import { AuthResponse } from "@/types/authResponse";
import { authSlice } from "../reducers/AuthReducer";
import { ResponseMessageData } from "../types/AuthTypes";

export const login = (email: string, password: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(authSlice.actions.setIsLoading(true));
            const response = await AuthService.login(email, password);
            localStorage.setItem("token", response.data.accessToken);
            const {
                email: userEmail,
                username: userName,
                activation_link: activationLink,
                
            } = response.data.user;
            dispatch(
                authSlice.actions.setUser({
                    email: userEmail,
                    username: userName,
                    activationLink, 
                })
            );
            dispatch(authSlice.actions.setAuth(true));
        } catch (e) {
            dispatch(authSlice.actions.setError('Неправильная почта или пароль!'));
        } finally {
            dispatch(authSlice.actions.setIsLoading(false));
        }
    };
};

export const registration = (
    email: string,
    password: string,
    username: string,
) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(authSlice.actions.setIsLoading(true));
            const response = await AuthService.registration(
                email,
                password,
                username,
            );
            console.log(response.data)
            const {
                email: userEmail,
                username: userName,
                activation_link: activationLink,
            } = response.data.user;
            dispatch(
                authSlice.actions.setUser({
                    email: userEmail,
                    username: userName,
                    activationLink,
                })
            );
        } catch (e) {
            console.log(e, email)
            dispatch(authSlice.actions.setError('Пользователь с такой почтой уже существует!'));
        } finally {
            dispatch(authSlice.actions.setIsLoading(false));
        }
    };
};

export const logout = () => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(authSlice.actions.setIsLogoutLoading(true));
            await AuthService.logout();
            dispatch(authSlice.actions.setAuth(false));
            dispatch(
                authSlice.actions.setUser({
                    email: "",
                    username: "",
                    activationLink: "",
                })
            );
            localStorage.removeItem("token");
        } catch (e) {
            // dispatch(authSlice.actions.setError(e.response?.data?.message));
        } finally {
            dispatch(authSlice.actions.setIsLogoutLoading(false));
        }
    };
};

export const checkAuth = () => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(authSlice.actions.setIsLoading(true));
            const response = await axios.get<AuthResponse>(
                `${process.env.API_URL}/auth/refresh`,
                { withCredentials: true },
            );

            const {
                email,
                username,
                activation_link: activationLink
            } = response.data.user

            dispatch(authSlice.actions.setUser({
                username,
                email,
                activationLink
            }));
            dispatch(authSlice.actions.setAuth(true));
            localStorage.setItem("token", response.data.accessToken);
        } catch (e) {
            // dispatch(authSlice.actions.setError(e.response?.data?.message))
        } finally {
            dispatch(authSlice.actions.setIsLoading(false));
        }
    };
};

export const sendRequestToResetPassword = (email: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(authSlice.actions.setIsLoading(true))
            const response = await AuthService.sendRequestToResetPassword(email)
            return response;
        } catch (e) {
            const axiosError = e as AxiosError<ResponseMessageData>;
            if(axiosError.response) dispatch(authSlice.actions.setError(axiosError.response?.data.message));
        } finally {
            dispatch(authSlice.actions.setIsLoading(false));
        }
    }
}

export const resetPassword = (newPassword: string, token: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(authSlice.actions.setIsLoading(true))
            const response = await AuthService.resetPassword(newPassword, token)
            return response;
        } catch (e) {
            // dispatch(authSlice.actions.setError(e.response?.data?.message));
        } finally {
            dispatch(authSlice.actions.setIsLoading(false));
        }
    }
}

export const verifyEmail = (activationCode: string, activationLink: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(authSlice.actions.setIsLoading(true))
            const response = await AuthService.verifyEmail(activationCode, activationLink)
            const {
                email,
                username,
                activation_link: userActivationLink
            } = response.data.user

            dispatch(authSlice.actions.setUser({
                username,
                email,
                activationLink: userActivationLink,
            }));
            localStorage.setItem('token', response.data.accessToken)
            dispatch(authSlice.actions.setAuth(true))
        } catch (e) {
            dispatch(authSlice.actions.setError('Неверный код активации!'));
        } finally {
            dispatch(authSlice.actions.setIsLoading(false));
        }
    }
}

export const changeUsername = (username: string, password: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(authSlice.actions.setIsChangingEmailLoading(true))
            const response = await AuthService.changeUsername(username, password)
            dispatch(authSlice.actions.setUsername(response.data.username))
            return response;
        } catch (e) {
            dispatch(authSlice.actions.setError('Неверный пароль!'));
        } finally {
            dispatch(authSlice.actions.setIsChangingEmailLoading(false));
        }
    }
}

export const changeEmailRequest = (email: string, password: string ) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(authSlice.actions.setIsChangingEmailLoading(true))
            const response = await AuthService.changeEmailRequest(email, password)
            return response;
        } catch (e) {
            dispatch(authSlice.actions.setError('Что-то пошло не так, проверьте почту и пароль'));
        } finally {
            dispatch(authSlice.actions.setIsChangingEmailLoading(false));
        }
    }
}

export const sendActivationCodeChangedEmail = (activationLink: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(authSlice.actions.setIsLoading(true))
            const response = await AuthService.sendActivationCodeChangedEmail(activationLink)
            dispatch(authSlice.actions.setSuccess('На вашу новую почту пришел код активации!'))
            return response;
        } catch (e) {
            dispatch(authSlice.actions.setError('Что-то пошло не так, проверьте почту и пароль'));
        } finally {
            dispatch(authSlice.actions.setIsLoading(false));
        }
    }
}

export const verifyChangedEmail = (activationLink: string, activationCode: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(authSlice.actions.setIsLoading(true))
            const response = await AuthService.verifyChangedEmail(activationLink, activationCode)
            dispatch(authSlice.actions.setEmail(response.data.email))
            return response;
        } catch (e) {
            dispatch(authSlice.actions.setError('Неправильный код активации!'));
        } finally {
            dispatch(authSlice.actions.setIsLoading(false));
        }
    }
}

export const changePassword = (new_password: string, old_password: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(authSlice.actions.setIsChangingPasswordLoading(true))
            const response = await AuthService.changePassword(new_password, old_password)
            return response;
        } catch (e) {
            dispatch(authSlice.actions.setError('Неправильный пароль!'));
        } finally {
            dispatch(authSlice.actions.setIsChangingPasswordLoading(false));
        }
    }
}