import { MenuItem } from "@/types/utilsTypes/antdTypes";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { PROFILE_PAGE } from "./routes";


export const profilePageMenuData: MenuItem[] = [
    {
        key: 'profile',
        label: <Link to={PROFILE_PAGE}>Профиль</Link>,
        icon: <UserOutlined />
    },
]