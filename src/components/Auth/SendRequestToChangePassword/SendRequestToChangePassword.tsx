import { FC } from "react";
import * as classes from "./index.module.scss";
import { FloatingLabelInput } from "@/UI/FloatLabelInput/FloatingLabelInput";
import CustomButton from "@/UI/CustomButton/CustomButton";
import { NotificationPopUp } from "@/UI/NotificationPopUp/NotificationPopUp";

interface SendRequestToChangePasswordProps {
    email: string;
    isErrorVisible: boolean;
    errorTitle: string;
    errorMessage: string;
    isSuccessVisible: boolean;
    successTitle: string;
    successMessage: string;
    isLoading: boolean
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    setIsErrorVisible: React.Dispatch<React.SetStateAction<boolean>>;
    handleSendRequest: () => void;
    setIsSuccessVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const SendRequestToChangePassword: FC<SendRequestToChangePasswordProps> = ({
    email,
    isErrorVisible,
    errorTitle,
    errorMessage,
    successTitle,
    successMessage,
    isSuccessVisible,
    isLoading,
    setEmail,
    handleSendRequest,
    setIsErrorVisible,
    setIsSuccessVisible,
}) => {
    return (
        <div className={classes.container}>
            <div className={classes.content}>
                <h1>Для сброса пароля укажите вашу почту</h1>
                <div className={classes.actions}>
                    <FloatingLabelInput
                        label="Почта"
                        value={email}
                        setValue={setEmail}
                        className={classes.input}
                    />
                    <CustomButton
                        text="Отправить письмо"
                        onClick={handleSendRequest}
                        isLoading={isLoading}
                    />
                </div>
            </div>

            <NotificationPopUp
                visible={isErrorVisible}
                setVisible={setIsErrorVisible}
                title={errorTitle}
                message={errorMessage}
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

export default SendRequestToChangePassword;
