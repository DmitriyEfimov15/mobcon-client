import RenderCheckBox from "@/components/ComponentsForRender/RenderCheckBox/RenderCheckBox";
import RenderInput from "@/components/ComponentsForRender/RenderInput/RenderInput";
import RenderSelect from "@/components/ComponentsForRender/RenderSelect/RenderSelect";
import RenderSwitch from "@/components/ComponentsForRender/RenderSwitch/RenderSwitch";
import RenderTextArea from "@/components/ComponentsForRender/RenderTextArea/RenderTextArea";
import { BlockItem } from "@/types/utilsTypes/dragAndDrop.types";
import Button from "@/UI/UiKitForRender/Button/Button";
import { ReactNode } from "react";

export const renderElement = (item: BlockItem): ReactNode => {
    switch (item.type) {
        case "button":
            return (
                <Button
                    style={item.props?.style}
                    text={item.props?.text}
                    {...item.props}
                />
            );
        case "input":
            return <RenderInput nodeId={item.id} props={item?.props || {}} />;
        case "textarea":
            return (
                <RenderTextArea nodeId={item.id} props={item?.props || {}} />
            );
        case "checkbox":
            return (
                <RenderCheckBox nodeId={item.id} props={item?.props || {}} />
            );
        case "switch":
            return <RenderSwitch nodeId={item.id} props={item?.props || {}} />;
        case "select":
            return <RenderSelect nodeId={item.id} props={item?.props || {}} />;
        default:
            return <p>Неизвестный блок</p>;
    }
};
