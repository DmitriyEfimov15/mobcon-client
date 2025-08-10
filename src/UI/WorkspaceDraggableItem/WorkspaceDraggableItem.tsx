import { FC, useEffect, useRef, useState } from "react";
import { useDrag } from "react-dnd";
import { BlockItem } from "@/types/utilsTypes/dragAndDrop.types";
import { renderElement } from "@/utils/renderElement";
import { getEmptyImage } from "react-dnd-html5-backend";
import classes from "./index.module.scss";
import classNames from "classnames";

interface WorkspaceDraggableItemProps {
    item: BlockItem;
    isSelected: boolean;
    onSelect: (id: string) => void;
}

const WorkspaceDraggableItem: FC<WorkspaceDraggableItemProps> = ({
    item,
    isSelected,
    onSelect,
}) => {
    const ref = useRef<HTMLDivElement>(null);

    const [{ isDragging }, drag, preview] = useDrag(() => ({
        type: "DROPPABLE_ITEM",
        item: { id: item.id },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    useEffect(() => {
        preview(getEmptyImage(), { captureDraggingState: true });
    }, [preview]);

    drag(ref);

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onSelect(item.id);
    };

    return (
        <div
            id={item.id}
            ref={ref}
            className={classNames(classes.item, {[classes.selected]: isSelected})}
            style={{
                position: "absolute",
                left: item?.position?.x ?? 0,
                top: item?.position?.y ?? 0,
                opacity: isDragging ? 0.5 : 1,
                cursor: "move",
            }}
            onClick={handleClick}
        >
            {renderElement(item)}
        </div>
    );
};

export default WorkspaceDraggableItem;
