import VerifyEmail from "@/components/Auth/VerifyEmail/VerifyEmail";
import { useAppDispatch, useAppSelector } from "@/hooks/reducers";
import {
    sendActivationCodeChangedEmail,
    verifyChangedEmail,
} from "@/store/actions/AuthAction";
import { PROFILE_PAGE } from "@/utils/routes";
import { FC, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

const CODE_LENGTH = 6;

const ChangeEmailContainer: FC = () => {
    const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(""));
    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
    const [errorHeader, setErrorHeader] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [isErrorVisible, setIsErrorVisible] = useState<boolean>(false);
    const { activationLink } = useParams();
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [successTitle, setSuccessTitle] = useState<string>("");
    const [isSuccessVisible, setIsSuccessVisible] = useState<boolean>(false);

    const { isLoading, error, success } = useAppSelector(
        (state) => state.authReducer
    );
    const dispatch = useAppDispatch();

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
            setErrorHeader("Ошибка!");
            setErrorMessage("Введите все цифры в коде активации!");
            return setIsErrorVisible(true);
        }

        if (activationLink) {
            const response = await dispatch(
                verifyChangedEmail(activationLink, fullCode)
            );

            if (response) {
                setSuccessTitle("Успех!");
                setSuccessMessage("Перенаправляем вас на другую страницу!");
                setIsSuccessVisible(true);
                return setTimeout(() => {
                    window.location.replace(PROFILE_PAGE)
                }, 3000)
            }
        }
    };

    useEffect(() => {
        if (error) {
            setErrorHeader("Ошибка!");
            setErrorMessage(error);
            setIsErrorVisible(true);
        }
    }, [error]);

    useEffect(() => {
        if (success) {
            setSuccessTitle("Успех!");
            setSuccessMessage(success);
            setIsSuccessVisible(true);
        }
    }, [success]);

    useEffect(() => {
        if (activationLink) {
            dispatch(sendActivationCodeChangedEmail(activationLink));
        }
    }, [activationLink]);

    return (
        <VerifyEmail
            code={code}
            inputsRef={inputsRef}
            isLoading={isLoading}
            errorVisible={isErrorVisible}
            errorHeader={errorHeader}
            errorMessage={errorMessage}
            successMessage={successMessage}
            successTitle={successTitle}
            isSuccessVisible={isSuccessVisible}
            setIsSuccessVisible={setIsSuccessVisible}
            handleChange={handleChange}
            handleKeyDown={handleKeyDown}
            verifyEmailFun={verifyEmailFun}
            setErrorVisible={setIsErrorVisible}
        />
    );
};

export default ChangeEmailContainer;
