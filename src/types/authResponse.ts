

export interface AuthDataUserReponseInterface {
    id: string
    activation_link: string
    password: string
    username: string
    activation_code: string
    email: string
    role_id: string
}   

export interface AuthDataChangeUsernameInterface {
    username: string
}

export interface AuthDataChangeEmailInterface {
    email: string
}

export interface AuthResponse {
    accessToken: string
    user: AuthDataUserReponseInterface
}