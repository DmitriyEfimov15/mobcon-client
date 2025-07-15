import SendRequestToChangePassword from "@/components/Auth/SendRequestToChangePassword/SendRequestToChangePassword";
import { useAppDispatch, useAppSelector } from "@/core/hooks/reducers";
import { sendRequestToResetPassword } from "@/store/actions/AuthAction";
import { FC, useEffect, useState } from "react";

const SendRequestToChangePasswordContainer: FC = () => {
    const [email, setEmail] = useState<string>("");
    const [errorTitle, setErrorTitle] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [isErrorVisible, setIsErrorVisible] = useState<boolean>(false);
    const [successTitle, setSuccessTitle] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [isSuccessVisible, setIsSuccessVisible] = useState<boolean>(false);

    const { error, isLoading } = useAppSelector((state) => state.authReducer);
    const dispatch = useAppDispatch();
    const handleSendRequest = async () => {
        if (!email) {
            setErrorMessage("Введите вашу почту!");
            setErrorTitle("Ошибка!");
            return setIsErrorVisible(true);
        }

        const response = await dispatch(sendRequestToResetPassword(email));
        if (response?.status === 201) {
            setSuccessTitle('Успешно!')
            setSuccessMessage(response.data.message)
            return setIsSuccessVisible(true)
        }
    };

    useEffect(() => {
        if (error) {
            setErrorMessage(error);
            setErrorTitle("Ошибка!");
            setIsErrorVisible(true);
        }
    }, [error]);
    return (
        <SendRequestToChangePassword
            email={email}
            errorMessage={errorMessage}
            errorTitle={errorTitle}
            isErrorVisible={isErrorVisible}
            successTitle={successTitle}
            successMessage={successMessage}
            isSuccessVisible={isSuccessVisible}
            isLoading={isLoading}
            setEmail={setEmail}
            handleSendRequest={handleSendRequest}
            setIsErrorVisible={setIsErrorVisible}
            setIsSuccessVisible={setIsSuccessVisible}
        />
    );
};

export default SendRequestToChangePasswordContainer;
