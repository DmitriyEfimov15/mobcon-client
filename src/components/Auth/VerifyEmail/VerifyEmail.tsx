import { FC } from "react";
import * as classes from "./index.module.scss";
import CustomButton from "@/UI/CustomButton/CustomButton";
import { NotificationPopUp } from "@/UI/NotificationPopUp/NotificationPopUp";

interface VerifyEmailProps {
    code: string[];
    inputsRef: React.RefObject<(HTMLInputElement | null)[]>;
    isLoading: boolean;
    errorVisible: boolean;
    errorHeader: string;
    errorMessage: string;
    successMessage?: string;
    successTitle?: string;
    isSuccessVisible?: boolean;
    handleChange: (value: string, index: number) => void;
    handleKeyDown: (
        e: React.KeyboardEvent<HTMLInputElement>,
        index: number
    ) => void;
    verifyEmailFun: () => void;
    setErrorVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setIsSuccessVisible?: React.Dispatch<React.SetStateAction<boolean>>;
}

const VerifyEmail: FC<VerifyEmailProps> = ({
    code,
    inputsRef,
    isLoading,
    errorHeader,
    errorMessage,
    errorVisible,
    successTitle,
    successMessage,
    isSuccessVisible,
    handleChange,
    handleKeyDown,
    verifyEmailFun,
    setErrorVisible,
    setIsSuccessVisible,
}) => {
    return (
        <div className={classes.container}>
            <div className={classes.content}>
                <h1>Подтверждение почты</h1>

                <p>Введите ваш код активации</p>
                <div className={classes.input__box}>
                    <div className={classes.code__inputs}>
                        {code.map((char: string, index: any) => (
                            <input
                                key={index}
                                ref={(el) => {
                                    inputsRef.current[index] = el;
                                }}
                                type="text"
                                maxLength={1}
                                className={classes.code__input}
                                value={char}
                                onChange={(e) =>
                                    handleChange(e.target.value, index)
                                }
                                onKeyDown={(e) => handleKeyDown(e, index)}
                            />
                        ))}
                    </div>
                </div>

                <CustomButton
                    text="Подтвердить"
                    isLoading={isLoading}
                    className={classes.button}
                    onClick={() => verifyEmailFun()}
                />
                <NotificationPopUp
                    visible={errorVisible}
                    setVisible={setErrorVisible}
                    title={errorHeader}
                    message={errorMessage}
                />
                {isSuccessVisible &&
                    setIsSuccessVisible &&
                    successMessage &&
                    successTitle && (
                        <NotificationPopUp
                            visible={isSuccessVisible}
                            setVisible={setIsSuccessVisible}
                            message={successMessage}
                            title={successTitle}
                            isError={false}
                        />
                    )}
            </div>
        </div>
    );
};

export default VerifyEmail;
