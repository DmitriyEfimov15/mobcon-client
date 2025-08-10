import { FC } from 'react';
import classes from './index.module.scss'

interface SwitchProps {
  id?: string;
  name?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  value?: string;
  label?: string;
  style?: React.CSSProperties;
}

export const Switch: FC<SwitchProps> = ({
  id,
  name,
  checked,
  defaultChecked,
  onChange,
  disabled,
  value,
  label,
  style,
}) => {
  return (
    <label className={classes['switch-wrapper']} style={style}>
      {label && <span className={classes["switch-label"]}>{label}</span>}
      <div className={classes["switch-container"]}>
        <input
          type="checkbox"
          id={id}
          name={name}
          checked={checked}
          defaultChecked={defaultChecked}
          onChange={onChange}
          disabled={disabled}
          value={value}
          className={classes["switch-input"]}
        />
        <span className={classes["switch-slider"]} />
      </div>
    </label>
  );
};
