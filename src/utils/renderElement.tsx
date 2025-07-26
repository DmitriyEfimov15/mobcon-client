import { BlockItem } from "@/types/utilsTypes/dragAndDrop.types";
import Button from "@/UI/UiKitForRender/Button/Button";
import { ReactNode } from "react";


export const renderElement = (item: BlockItem): ReactNode => {
    switch (item.type) {
        case('button'):
            return <Button style={item.props?.style} text={item.props?.text} {...item.props}/>
        default: 
            return <p>Неизвестный блок</p>
    }
}