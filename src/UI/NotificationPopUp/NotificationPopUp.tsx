import React, { useEffect, useState } from "react";
import * as classes from "./NotificationPopUp.module.scss";
import { useAppDispatch } from "@/core/hooks/reducers";
import { authSlice } from "@/store/reducers/AuthReducer";

interface NotificationPopUpProps {
  title: string;
  message: string;
  duration?: number;
  visible: boolean;
  isError?: boolean
  onClose?: () => void;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NotificationPopUp: React.FC<NotificationPopUpProps> = ({
  title,
  message,
  duration = 3000,
  visible,
  isError = true,
  onClose,
  setVisible,
}) => {
  const [animationKey, setAnimationKey] = useState(0);
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!visible) return;

    // перезапускаем анимацию
    setAnimationKey((prev) => prev + 1);

    const timeout = setTimeout(() => {
      setVisible(false);
      dispatch(authSlice.actions.setError(null))
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timeout);
  }, [visible, duration, onClose, setVisible]);

  return (
    <div className={`${isError ? classes.popupError : classes.popupSuccess} ${visible ? classes.show : classes.hide}`}>
      <div className={classes.content}>
        <strong>{title}</strong>
        <p>{message}</p>
        <div
          key={animationKey}
          className={isError ? classes.progressError : classes.progressSuccess}
          style={{ animationDuration: `${duration}ms` }}
        />
      </div>
    </div>
  );
};
