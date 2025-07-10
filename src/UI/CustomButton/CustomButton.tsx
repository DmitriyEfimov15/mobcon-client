import { FC } from "react";
import * as classes from "./CustomButton.module.scss";
import Loader from "../Loader/Loader";

interface CustomButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    className?: string;
    isLoading?: boolean;
    disabledFlag?: boolean
}

const CustomButton: FC<CustomButtonProps> = ({
    text,
    className,
    isLoading,
    disabledFlag,
    ...props
}) => {
    const disabledBtn = isLoading || disabledFlag
    return (
        <button
            className={`${classes.button} ${className || ""}`.trim()}
            disabled={disabledBtn}
            {...props}
        >
            {isLoading ? <Loader /> : text}
        </button>
    );
};

export default CustomButton;
