import { FC } from "react";
import classes from "./index.module.scss";
import logo from "@/assets/logotextright.jpg";
import { Menu } from "antd";
import { projectsPageMenuData } from "@/utils/ProjectsPageMenuData";
import { Outlet, useLocation } from "react-router-dom";
import { MenuItem } from "@/types/utilsTypes/antdTypes";
import { cardLayoutMenuData } from "@/utils/CardLayoutMenuData";
import CustomButton from "../CustomButton/CustomButton";

interface CardLayoutProps {
    sideBarMenu: MenuItem[]
}

const CardLayout: FC<CardLayoutProps> = ({sideBarMenu}) => {
    const { pathname } = useLocation();

    return (
        <div className={classes.container}>
            <div className={classes.content}>
                <div className={classes.logo__container}>
                    <img src={logo} alt="Logo" />
                </div>
                <div className={classes.navigation}>
                    <Menu
                      className={classes.top__menu}
                      mode="horizontal"
                      items={cardLayoutMenuData}
                      selectedKeys={[pathname.split("/")[1]]}
                     />
                     <CustomButton
                        text="Тарифы"
                        className={classes.cost__button}
                     />
                </div>
                <div className={classes.sidebar}>
                    <p className={classes.sidebar__title}>Боковое меню</p>
                    <Menu
                        selectedKeys={[pathname.split("/")[2]]}
                        items={sideBarMenu}
                    />
                </div>
                <div className={classes.main__info}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default CardLayout;
