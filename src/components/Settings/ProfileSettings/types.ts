import { FormInstance } from "antd"


export interface ProfileSettingsProps {
    formUsername: FormInstance<FormUsernameI>
    formEmail: FormInstance<FormEmailI>
    formPassword: FormInstance<FormPasswordI>
    isPasswordUserVisible: boolean
    isChangeUsernameButtonDisabled: boolean
    errorVisible: boolean;
    errorHeader: string;
    errorMessage: string;
    isChangeEmailButtonDisabled: boolean
    isPasswordEmailVisible: boolean
    isChangingUsernameLoading: boolean
    isChangingEmailLoading: boolean
    successVisible: boolean
    successMessage: string
    successTitle: string
    isChangingPasswordLoading: boolean
    isChangePasswordButtonDisabled: boolean
    setSuccessVisible: React.Dispatch<React.SetStateAction<boolean>>;
    handleValuesUserChange: (changedValues: Partial<FormUsernameI>) => void
    onFinishUsername: () => void
    setErrorVisible: React.Dispatch<React.SetStateAction<boolean>>;
    onFinishEmail: () => void
    handleValuesEmailChange: (changedValues: Partial<FormEmailI>) => void
    onFinishPassword: () => void
    handleValuesPasswordChange:  (changedValues: Partial<FormPasswordI>, allValues: FormPasswordI) => void
    logOutFun: () => void
}

export interface FormUsernameI {
    username: string
    password: string
}

export interface FormEmailI {
    email: string
    password: string
}

export interface FormPasswordI {
    password: string
    confirmPassword: string
}