import { MenuItem } from "@/types/utilsTypes/antdTypes";
import { DASHBORD_PAGE, PROFILE_PAGE } from "./routes";
import { Link } from "react-router-dom";

export const cardLayoutMenuData: MenuItem[] = [
    {
        key: 'projects',
        label: <Link to={DASHBORD_PAGE}>Проекты</Link>,
    },
    {
        key: 'settings',
        label: <Link to={PROFILE_PAGE}>Настройки</Link>,
    }
]