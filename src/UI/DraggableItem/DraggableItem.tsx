import { FC } from "react";
import classes from "./index.module.scss";
import { BlockItem } from "@/types/utilsTypes/dragAndDrop.types";
import { Flex } from "antd";
import { blockIcons } from "@/utils/ComponentLibrary";
import { useDrag } from "react-dnd";

interface DraggableItemProps {
    item: BlockItem;
}

const DraggableItem: FC<DraggableItemProps> = ({ item }) => {
    const [{ isDragging }, dragRef, preview] = useDrag(() => ({
        type: "MENU_ITEM",
        item: {
            id: item.id,
            type: item.type,
            props: item.props,
            label: item.label,
            icon: item.label,
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    const style: React.CSSProperties = {
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
    };

    return (
        <Flex
            ref={(node) => {
                dragRef(node);
            }}
            style={style}
            vertical
            className={classes.draggableItem}
        >
            <div className={classes.icon}>{blockIcons[item.type]}</div>
            <p className={classes.label}>{item.label}</p>
        </Flex>
    );
};

export default DraggableItem;
