import CardLayout from "@/UI/CardLayout/CardLayout";
import { profilePageMenuData } from "@/utils/SettingsLayoutMenuData";
import { FC } from "react";


const Settings: FC = () => {
    return (
        <CardLayout
            sideBarMenu={profilePageMenuData}
        />
    )
}

export default Settings;