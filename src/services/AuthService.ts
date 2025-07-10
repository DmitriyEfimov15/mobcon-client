
import { AxiosResponse } from "axios";
import $api from "../http/index";
import { AuthDataChangeEmailInterface, AuthDataChangeUsernameInterface, AuthResponse } from "@/types/authResponse";
import { ResponseMessageData } from "@/store/types/AuthTypes";

export default class AuthService {
    static async registration(email: string, password: string, username: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post('/auth/registration', {email, password, username})
    }

    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post('/auth/login', {email, password})
    }

    static async logout(): Promise<any> {
        return $api.get('/auth/logout')
    }

    static async sendRequestToResetPassword(email: string): Promise<AxiosResponse<ResponseMessageData>> {
        return $api.post('/auth/send-request-to-reset-password', {email})
    }

    static async resetPassword(newPassword: string, token: string): Promise<AxiosResponse<ResponseMessageData>> {
        return $api.post(`/auth/reset-password/${token}`, { newPassword });
    }

    static async verifyEmail(activationCode: string, activationLink: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post('/auth/verify-email', {activationCode, activationLink})
    }

    static async changeUsername(username: string, password: string): Promise<AxiosResponse<AuthDataChangeUsernameInterface>> {
        return $api.put('/auth/username', {username, password})
    }

    static async changeEmailRequest(email: string, password: string): Promise<AxiosResponse<void>> {
        return $api.post('/auth/change-email-request', {email, password})
    }

    static async sendActivationCodeChangedEmail(activation_link: string): Promise<AxiosResponse<void>> {
        return $api.post('/auth/send-activation-code-changed-email', {activation_link})
    }

    static async verifyChangedEmail(activation_link: string, activation_code: string):  Promise<AxiosResponse<AuthDataChangeEmailInterface>>{
        return $api.post('/auth/verify-changed-email', {activation_link, activation_code})
    }

    static async changePassword(new_password: string, old_password: string): Promise<AxiosResponse<AuthDataChangeEmailInterface>> {
        return $api.post('/auth/change-password', {new_password, old_password})
    }
}