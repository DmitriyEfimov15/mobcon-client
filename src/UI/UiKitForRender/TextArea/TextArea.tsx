import React, { FC, ChangeEvent } from "react";

interface TextAreaProps {
  placeholder?: string;
  value?: string | number;
  rows?: number;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  style?: React.CSSProperties;
}

const TextArea: FC<TextAreaProps> = ({
  placeholder,
  value,
  rows = 4,
  onChange,
  disabled = false,
  required = false,
  name = "",
  style = {},
}) => {
  return (
    <textarea
      placeholder={placeholder}
      value={value}
      rows={rows}
      onChange={onChange}
      disabled={disabled}
      required={required}
      name={name}
      style={style}
    />
  );
};

export default TextArea;
