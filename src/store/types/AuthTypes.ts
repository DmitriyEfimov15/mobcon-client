export interface AuthData {
    user: AuthUserData
    isLoading: boolean
    error: string | null
    isAuth: boolean
    isChangingUsernameLoading: boolean
    isChangingEmailLoading: boolean
    isChangingPasswordLoading: boolean
    success: string | null
    isLogoutLoading: boolean
}

export type AuthUserData = {
    email: string
    username: string
    activationLink: string
}

export interface ResponseMessageData {
    message: string;
}