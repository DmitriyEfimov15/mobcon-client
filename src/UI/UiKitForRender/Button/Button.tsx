import { FC } from "react";

interface ButtonProps {
    text: string;
    onClick?: () => void | null;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
    style?: React.CSSProperties;
}

const Button: FC<ButtonProps> = ({
    text,
    onClick = null,
    disabled = false,
    type = "button",
    style = {},
}) => {
    return (
        <button onClick={onClick || undefined} disabled={disabled} type={type} style={style}>
            {text}
        </button>
    );
};

export default Button;
