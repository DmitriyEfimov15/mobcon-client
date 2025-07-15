import ResetPassword from "@/components/Auth/ResetPassword/ResetPassword";
import { useAppDispatch, useAppSelector } from "@/core/hooks/reducers";
import { resetPassword } from "@/store/actions/AuthAction";
import { LOGIN_ROUTE } from "@/utils/routes";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ResetPasswordContainer: FC = () => {
    const [password, setPassword] = useState<string>("");
    const [repeatPassword, setRepeatPassword] = useState<string>("");
    const [errorTitle, setErrorTitle] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [isErrorVisible, setIsErrorVisible] = useState<boolean>(false);
    const [successTitle, setSuccessTitle] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [isSuccessVisible, setIsSuccessVisible] = useState<boolean>(false);
    const { token } = useParams<{ token: string }>();

    const { isLoading, error } = useAppSelector((state) => state.authReducer);
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (error) {
            setErrorMessage(error);
            setErrorTitle("Ошибка!");
            setIsErrorVisible(true);
        }
    }, [error]);

    const handleResetPassword = async () => {
        if (password !== repeatPassword) {
            setErrorTitle("Ошибка!")
            setErrorMessage("Пароли не совпадают!")
            return setIsErrorVisible(true)
        }

        if (token) {
            const response = await dispatch(resetPassword(password, token))
            if (response?.status === 201) {
                setSuccessTitle("Успешно!")
                setSuccessMessage(`${response?.data.message} Переводим вас на страницу входа!`)
                setIsSuccessVisible(true)
                setTimeout(() => {
                    window.location.href = `${LOGIN_ROUTE}`;
                }, 4000)

                return
            }
        }
        
        setErrorTitle("Ошибка!")
        setErrorMessage("Ссылка отстутвует, попробуйте позже!")
        return setIsErrorVisible(true)
    };

    return (
        <ResetPassword
            password={password}
            repeatPassword={repeatPassword}
            isLoading={isLoading}
            errorMessage={errorMessage}
            errorTitle={errorTitle}
            isErrorVisible={isErrorVisible}
            successTitle={successTitle}
            successMessage={successMessage}
            isSuccessVisible={isSuccessVisible}
            setPassword={setPassword}
            setRepeatPassword={setRepeatPassword}
            handleResetPassword={handleResetPassword}
            setIsErrorVisible={setIsErrorVisible}
            setIsSuccessVisible={setIsSuccessVisible}
        />
    );
};

export default ResetPasswordContainer;
