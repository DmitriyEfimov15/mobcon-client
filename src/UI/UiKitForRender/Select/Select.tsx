import { FC, useState, useRef, useEffect } from "react";
import classes from "./index.module.scss";

interface Option {
  label: string;
  value: string | number;
}

interface SelectProps {
  value?: string | number;
  options: Option[];
  onChange?: (value: string | number) => void;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
}

const Select: FC<SelectProps> = ({
  value,
  options,
  onChange,
  disabled = false,
  placeholder = "Выбрать...",
  className = "",
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value);

  const handleOptionClick = (val: string | number) => {
    onChange?.(val);
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={ref}
      className={`${classes.selectWrapper} ${disabled ? classes.disabled : ""} ${className}`}
    >
      <div
        className={classes.selectDisplay}
        onClick={() => !disabled && setOpen((prev) => !prev)}
      >
        <span className={classes.selectValue}>
          {selected?.label || placeholder}
        </span>
        <span className={classes.arrow} />
      </div>

      {open && (
        <ul className={classes.options}>
          {options.map((option) => (
            <li
              key={option.value}
              className={`${classes.option} ${
                value === option.value ? classes.selected : ""
              }`}
              onClick={() => handleOptionClick(option.value)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;
