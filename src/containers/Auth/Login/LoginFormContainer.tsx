import LoginForm from "@/components/Auth/Login/LoginForm";
import { useAppDispatch, useAppSelector } from "@/hooks/reducers";
import { login } from "@/store/actions/AuthAction";
import { FC, useEffect, useState } from "react";

const LoginFormContainer: FC = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [errorVisible, setErrorVisible] = useState<boolean>(false)
    const [errorHeader, setErrorHeader] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string>('')

    const {isLoading, error} = useAppSelector(state => state.authReducer)
    const dispatch = useAppDispatch()

    const formLogin = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if (!email || !password) {
            setErrorHeader("Ошибка!")
            setErrorMessage("Заполните все обязательные поля!")
            return setErrorVisible(true)
        } 

        dispatch(login(email, password))
    }

    useEffect(() => {
        if (error) {
            setErrorHeader("Ошибка!")
            setErrorMessage(error)
            setErrorVisible(true)
        }
    }, [error])

    return (
        <LoginForm
            email={email}
            password={password}
            isLoading={isLoading}
            errorVisible={errorVisible}
            errorHeader={errorHeader}
            errorMessage={errorMessage}
            setEmail={setEmail}
            setPassword={setPassword}
            formLogin={formLogin}
            setErrorVisible={setErrorVisible}
        />
    )
}

export default LoginFormContainer;