import { FC, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import "@/styles/global.styles.css";
import { NotificationPopUp } from "@/UI/NotificationPopUp/NotificationPopUp";
import { useAppSelector } from "@/core/hooks/reducers";

const App: FC = () => {
    const [notificationMessage, setNotificationMessage] = useState<string>("");
    const [notificationVisible, setNotificationVisible] =
        useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(true);
    const { notification } = useAppSelector((state) => state.appReducer);

    useEffect(() => {
        if (notification) {
            setNotificationVisible(true)
            setNotificationMessage(notification.message);
            if (Number(notification.statusCode) >= 400)
                return setIsError(true);
            return setIsError(false);
        }
    }, [notification]);
    
    return (
        <div>
            <NotificationPopUp
                title={isError ? 'Ошибка' : "Успех"}
                message={notificationMessage}
                setVisible={setNotificationVisible}
                visible={notificationVisible}
                isError={isError}
            />
            <Outlet />
        </div>
    );
};

export default App;
