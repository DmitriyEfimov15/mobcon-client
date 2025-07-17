import { FC } from "react";
import classes from "./index.module.scss";
import Preview from "@/UI/Preview/Preview";
import { FloatingLabelInput } from "@/UI/FloatLabelInput/FloatingLabelInput";
import CustomButton from "@/UI/CustomButton/CustomButton";
import { Link } from "react-router-dom";
import { REGISTRATION_ROUTE, SEND_REQUEST_TO_CHANGE_PASSWORD_ROUTE } from "@/utils/routes";
import { NotificationPopUp } from "@/UI/NotificationPopUp/NotificationPopUp";

interface LoginFormProps {
    email: string;
    password: string;
    isLoading: boolean;
    errorVisible: boolean;
    errorHeader: string;
    errorMessage: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    formLogin: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    setErrorVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginForm: FC<LoginFormProps> = ({
    email,
    password,
    isLoading,
    errorVisible,
    errorHeader,
    errorMessage,
    setEmail,
    setPassword,
    formLogin,
    setErrorVisible,
}) => {
    return (
        <div className={classes.container}>
            <div className={classes.preview}>
                <Preview />
            </div>

            <div className={classes.login__form}>
                <div className={classes.login__content}>
                    <h1 className={classes.text__header}>Вход</h1>
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
                            label="Пароль"
                            value={password}
                            setValue={setPassword}
                            type="password"
                        />
                        <Link to={SEND_REQUEST_TO_CHANGE_PASSWORD_ROUTE} className={classes.link}>
                            Забыли пароль?
                        </Link>
                        <CustomButton
                            text="Войти"
                            isLoading={isLoading}
                            className={classes.button}
                            onClick={(e) => formLogin(e)}
                        />

                        <Link to={REGISTRATION_ROUTE} className={classes.link}>
                            Еще нет аккаунта?
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

export default LoginForm;
