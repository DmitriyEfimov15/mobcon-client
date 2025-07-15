import VerifyEmail from "@/components/Auth/VerifyEmail/VerifyEmail";
import { useAppDispatch, useAppSelector } from "@/core/hooks/reducers";
import { verifyEmail } from "@/store/actions/AuthAction";
import { FC, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

const CODE_LENGTH = 6;

const VerifyEmailContainer: FC = () => {
    const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(""));
    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
    const [errorHeader, setErrorHeader] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [isErrorVisible, setIsErrorVisible] = useState<boolean>(false)
    const {activationLink} = useParams()

    const {isLoading, error} = useAppSelector(state => state.authReducer)
    const dispatch = useAppDispatch()

    const handleChange = (value: string, index: number) => {
        if (!/^\d?$/.test(value)) return; // Только цифры
        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        if (value && index < CODE_LENGTH - 1) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
        index: number
    ) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    const verifyEmailFun = async () => {
        const fullCode = code.join("");
        if (fullCode.length !== 6) {
            setErrorHeader('Ошибка!')
            setErrorMessage("Введите все цифры в коде активации!")
            return setIsErrorVisible(true)
        }
        if (activationLink) await dispatch(verifyEmail(fullCode, activationLink))
    }

    useEffect(() => {
        if (error) {
            setErrorHeader('Ошибка!')
            setErrorMessage(error)
            setIsErrorVisible(true)
        }
    }, [error])

    return (
        <VerifyEmail
            code={code}
            inputsRef={inputsRef}
            isLoading={isLoading}
            handleChange={handleChange}
            handleKeyDown={handleKeyDown}
            verifyEmailFun={verifyEmailFun}
            errorVisible={isErrorVisible}
            setErrorVisible={setIsErrorVisible}
            errorHeader={errorHeader}
            errorMessage={errorMessage}
        />
    )
}

export default VerifyEmailContainer