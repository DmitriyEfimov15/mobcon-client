import { FC } from "react";
import CustomButton from "@/UI/CustomButton/CustomButton";
import * as classes from "./index.module.scss";
import logo from "@/assets/logotextright.jpg";

const Dashboard: FC = () => {
    return (
        <div>
            <div className={classes.logo__info__container}>
                <img src={logo} alt="logoInfo" />
            </div>
            <h1>
                Создавайте мобильные приложения с <span>No-Code</span>
            </h1>
            <p>
                Используйте интуитивно понятные инструменты для создания,
                настройки и публикации собственных мобильных приложений
            </p>
            <CustomButton
                text="Создать проект"
                className={classes.button__start}
            />
        </div>
    );
};

export default Dashboard;
