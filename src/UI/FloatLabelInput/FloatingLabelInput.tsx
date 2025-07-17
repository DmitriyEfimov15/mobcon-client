import React, { useState } from 'react';
import classes from './FloatingLabelInput.module.scss';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import classNames from 'classnames';

interface FloatingLabelInputProps {
  label: string;
  value: string;
  setValue: (value: string) => void;
  type?: string;
  name?: string;
  className?: string
}

export const FloatingLabelInput: React.FC<FloatingLabelInputProps> = ({
  label,
  value,
  setValue,
  type = 'text',
  name,
  className,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === 'password';

  return (
    <div className={classNames(classes.floating__input__wrapper, className)}>
    {/* <div className={classes.floating__input__wrapper}> */}
      <input
        type={isPassword && !showPassword ? 'password' : 'text'}
        name={name}
        className={`${classes.floating__input} ${isFocused || value ? classes.active : ''}`}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <label className={`${classes.floating__label} ${isFocused || value ? classes.active : ''}`}>
        {label}
      </label>

      {isPassword && (
        <span
          className={classes.password__toggle}
          onClick={() => setShowPassword(prev => !prev)}
        >
          {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
        </span>
      )}
    </div>
  );
};
