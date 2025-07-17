import { FC } from "react";
import classes from './index.module.scss'

const MobileBlock = () => {
    return (
        <div className={classes.container}>
            Доступ с мобильных устройств запрещён. Пожалуйста, используйте компьютер.
        </div>
    )
}

export default MobileBlock;