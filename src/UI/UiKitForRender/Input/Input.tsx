import { FC, ChangeEvent } from "react";

interface InputProps {
    value?: string | number;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void | null;
    placeholder?: string;
    type?: "text" | "password" | "email" | "number" | "search" | "tel" | "url";
    disabled?: boolean;
    style?: React.CSSProperties;
    name?: string;
}

const Input: FC<InputProps> = ({
    value,
    onChange = null,
    placeholder = "",
    type = "text",
    disabled = false,
    style = {},
    name,
}) => {
    return (
        <input
            value={value ?? ''}
            onChange={onChange || undefined}
            placeholder={placeholder}
            type={type}
            disabled={disabled}
            style={style}
            name={name}
        />
    );
};

export default Input;
