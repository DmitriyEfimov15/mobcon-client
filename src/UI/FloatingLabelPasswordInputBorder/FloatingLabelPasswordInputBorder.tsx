import { FC, useState } from "react";
import { Input } from "antd";
import classes from "./index.module.scss";
import classNames from "classnames";

interface FloatingLabelPasswordInputBorderProps {
    label: string;
    value?: string;
    type?: string;
    name?: string;
    className?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FloatingLabelPasswordInputBorder: FC<FloatingLabelPasswordInputBorderProps> = ({
    label,
    value = "",
    onChange,
    name,
    className,
}) => {
    const [isFocused, setIsFocused] = useState(false);

    const shouldFloat = isFocused || value.length > 0;

    return (
        <div
            className={classNames(classes.floating_label_input, {
                [classes.focused]: shouldFloat,
            })}
        >
            <label className={classes.floating_label}>{label}</label>
            <Input.Password
                name={name}
                value={value}
                onChange={onChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className={classNames(classes.input, className)}
            />
        </div>
    );
};

export default FloatingLabelPasswordInputBorder;
