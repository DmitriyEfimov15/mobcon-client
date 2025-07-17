import { FC } from "react";
import classes from "./index.module.scss";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

interface RecentMenuProps {
    editFun: () => void
    deleteFun: () => void
}

const RecentMenu: FC<RecentMenuProps> = ({editFun, deleteFun}) => {
    return (
        <div className={classes.menu} onClick={(e) => e.preventDefault()}>
            <header className={classes.header}>
                <p>Меню</p>
            </header>

            <div className={classes.main}>
                <div className={classes.action} onClick={editFun}>
                    <EditOutlined className={classes.edit}/>
                    <p>Редактировать</p>
                </div>
                <div className={classes.action} onClick={deleteFun}>
                    <DeleteOutlined className={classes.delete}/>
                    <p>Удалить</p>
                </div>
            </div>
        </div>
    );
};

export default RecentMenu;
