import { FC, use, useEffect, useState } from "react";
import RegistrationForm from "@/components/Auth/Registration/RegistrationForm";
import { useAppDispatch, useAppSelector } from "@/core/hooks/reducers";
import { registration } from "@/store/actions/AuthAction";
import { useNavigate } from "react-router-dom";
import { VERIFY_EMAIL_ROUTE } from "@/utils/routes";

const RegistrationFormContainer: FC = () => {
    const [email, setEmail] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordRepeat, setPasswordRepeat] = useState<string>("");
    const [errorVisible, setErrorVisible] = useState<boolean>(false);
    const [errorHeader, setErrorHeader] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");

    const { isLoading, error, user } = useAppSelector(
        (state) => state.authReducer
    );
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const formRegistration = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault();

        if (!email || !username || !password || !passwordRepeat) {
            setErrorHeader("Ошибка!");
            setErrorMessage("Заполните все обязательные поля!");
            return setErrorVisible(true);
        }

        if (password !== passwordRepeat) {
            setErrorHeader("Ошибка!");
            setErrorMessage("Пароли не совпадают!");
            return setErrorVisible(true);
        }

        dispatch(registration(email, password, username));
    };

    useEffect(() => {
        if (error) {
            setErrorHeader("Ошибка!");
            setErrorMessage(error);
            setErrorVisible(true);
        }
    }, [error]);

    useEffect(() => {
        if (user.activationLink && !error) {
            navigate(VERIFY_EMAIL_ROUTE.replace(':activationLink', user.activationLink));
        }
    }, [user])

    return (
        <RegistrationForm
            email={email}
            username={username}
            password={password}
            passwordRepeat={passwordRepeat}
            isLoading={isLoading}
            errorVisible={errorVisible}
            errorHeader={errorHeader}
            errorMessage={errorMessage}
            setEmail={setEmail}
            setUsername={setUsername}
            setPassword={setPassword}
            setPasswordRepeat={setPasswordRepeat}
            formRegistration={formRegistration}
            setErrorVisible={setErrorVisible}
        />
    );
};

export default RegistrationFormContainer;
