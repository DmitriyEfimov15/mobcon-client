import { FC } from "react";
import * as classes from "./index.module.scss";
import Preview from "@/UI/Preview/Preview";
import { FloatingLabelInput } from "@/UI/FloatLabelInput/FloatingLabelInput";
import CustomButton from "@/UI/CustomButton/CustomButton";
import { Link } from "react-router-dom";
import { LOGIN_ROUTE } from "@/utils/routes";
import { NotificationPopUp } from "@/UI/NotificationPopUp/NotificationPopUp";

interface RegistrationFormProps {
    email: string;
    username: string;
    password: string;
    passwordRepeat: string;
    isLoading: boolean;
    errorVisible: boolean;
    errorHeader: string;
    errorMessage: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    setUsername: React.Dispatch<React.SetStateAction<string>>;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    setPasswordRepeat: React.Dispatch<React.SetStateAction<string>>;
    setErrorVisible: React.Dispatch<React.SetStateAction<boolean>>;
    formRegistration: (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => void;
}

const RegistrationForm: FC<RegistrationFormProps> = ({
    email,
    password,
    username,
    passwordRepeat,
    isLoading,
    errorVisible,
    errorHeader,
    errorMessage,
    setErrorVisible,
    setEmail,
    setPassword,
    setUsername,
    setPasswordRepeat,
    formRegistration,
}) => {
    return (
        <div className={classes.container}>
            <div className={classes.preview}>
                <Preview />
            </div>

            <div className={classes.registration__form}>
                <div className={classes.registration__content}>
                    <h1 className={classes.text__header}>Регистрация</h1>
                    <h2 className={classes.text__subHeader}>
                        Создавай с MobCon!
                    </h2>

                    <form className={classes.form}>
                        <FloatingLabelInput
                            label="Почта"
                            value={email}
                            setValue={setEmail}
                            type="text"
                        />
                        <FloatingLabelInput
                            label="Имя пользователя"
                            value={username}
                            setValue={setUsername}
                            type="text"
                        />
                        <FloatingLabelInput
                            label="Пароль"
                            value={password}
                            setValue={setPassword}
                            type="password"
                        />
                        <FloatingLabelInput
                            label="Повторите пароль"
                            value={passwordRepeat}
                            setValue={setPasswordRepeat}
                            type="password"
                        />

                        <CustomButton
                            text="Зарегистрироваться"
                            isLoading={isLoading}
                            className={classes.button}
                            onClick={(e) => formRegistration(e)}
                        />

                        <Link to={LOGIN_ROUTE} className={classes.link}>
                            Уже есть аккаунт?
                        </Link>
                        <NotificationPopUp
                            visible={errorVisible}
                            setVisible={setErrorVisible}
                            title={errorHeader}
                            message={errorMessage}
                        />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegistrationForm;
