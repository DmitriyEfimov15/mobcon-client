import { FC } from "react";
import * as classes from "./index.module.scss";
import { FloatingLabelInput } from "@/UI/FloatLabelInput/FloatingLabelInput";
import CustomButton from "@/UI/CustomButton/CustomButton";
import { NotificationPopUp } from "@/UI/NotificationPopUp/NotificationPopUp";

interface ResetPasswordProps {
    password: string;
    repeatPassword: string;
    isLoading: boolean;
    isErrorVisible: boolean;
    errorTitle: string;
    errorMessage: string;
    isSuccessVisible: boolean;
    successTitle: string;
    successMessage: string;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    setRepeatPassword: React.Dispatch<React.SetStateAction<string>>;
    handleResetPassword: () => void;
    setIsErrorVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setIsSuccessVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const ResetPassword: FC<ResetPasswordProps> = ({
    password,
    repeatPassword,
    isLoading,
    isErrorVisible,
    isSuccessVisible,
    successTitle,
    successMessage,
    errorTitle,
    errorMessage,
    setIsErrorVisible,
    setIsSuccessVisible,
    setPassword,
    setRepeatPassword,
    handleResetPassword,
}) => {
    return (
        <div className={classes.container}>
            <div className={classes.content}>
                <h1>Сброс пароля</h1>
                <FloatingLabelInput
                    value={password}
                    setValue={setPassword}
                    label="Пароль"
                    type="password"
                />
                <FloatingLabelInput
                    value={repeatPassword}
                    setValue={setRepeatPassword}
                    label="Повторите пароль"
                    type="password"
                />
                <CustomButton
                    text="Сбросить пароль"
                    isLoading={isLoading}
                    onClick={handleResetPassword}
                />
            </div>

            <NotificationPopUp
                message={errorMessage}
                title={errorTitle}
                setVisible={setIsErrorVisible}
                visible={isErrorVisible}
            />

            <NotificationPopUp
                visible={isSuccessVisible}
                setVisible={setIsSuccessVisible}
                title={successTitle}
                message={successMessage}
                isError={false}
            />
        </div>
    );
};

export default ResetPassword;
