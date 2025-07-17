import { FC } from "react";
import classes from './index.module.scss'
import Loader from "../Loader/Loader";
import classNames from "classnames";


interface CancelButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text?: string
    isLoading?: boolean;
    disabledFlag?: boolean
    className?: string
}

const CancelButton: FC<CancelButtonProps> = ({
    text,
    isLoading,
    disabledFlag,
    className,
    ...props
}) => {
    const disabledBtn = isLoading || disabledFlag
    return (
        <button disabled={disabledBtn} className={classNames(classes.button, className)} {...props}>
            {isLoading ? <Loader/> : text}
        </button>
    )
}

export default CancelButton;