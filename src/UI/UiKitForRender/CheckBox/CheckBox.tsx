import React, { FC, ChangeEvent } from "react";

interface CheckBoxProps {
  checked?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  label?: string;
  name?: string;
  style?: React.CSSProperties;
}

const CheckBox: FC<CheckBoxProps> = ({
  checked = false,
  onChange,
  disabled = false,
  label = "",
  name,
  style = {},
}) => {
  return (
    <label style={{ display: "flex", alignItems: "center", cursor: disabled ? "not-allowed" : "pointer", ...style }}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        name={name}
        style={{ marginRight: label ? 8 : 0 }}
      />
      {label && <span>{label}</span>}
    </label>
  );
};

export default CheckBox;
