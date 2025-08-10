import { BlockItem } from "@/types/utilsTypes/dragAndDrop.types";
import { FC, useRef } from "react";
import classes from "./index.module.scss";
import { useDrop } from "react-dnd";
import WorkspaceDraggableItem from "../WorkspaceDraggableItem/WorkspaceDraggableItem";
import { useAppDispatch, useAppSelector } from "@/core/hooks/reducers";
import { setCurrentElementId } from "@/store/reducers/elementListReducer";
interface DroppableZoneProps {
    items: BlockItem[];
    onDrop?: (item: any) => void;
    onMove: (id: string, newPos: { x: number; y: number }) => void;
}

const DroppableZone: FC<DroppableZoneProps> = ({ items, onDrop, onMove }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch();
    const { currentElementId } = useAppSelector(
        (state) => state.elementListReducer.present
    );

    const [, drop] = useDrop({
        accept: ["DROPPABLE_ITEM", "MENU_ITEM"],
        hover(item: BlockItem, monitor) {
            if (monitor.getItemType() === "DROPPABLE_ITEM") {
                if (!containerRef.current) return;

                const clientOffset = monitor.getClientOffset();
                if (!clientOffset) return;

                const containerRect =
                    containerRef.current.getBoundingClientRect();

                const el = document.getElementById(item.id);

                let elWidth = 0;
                let elHeight = 0;
                if (el) {
                    const elRect = el.getBoundingClientRect();
                    elWidth = elRect.width;
                    elHeight = elRect.height;
                }

                let x = clientOffset.x - containerRect.left;
                let y = clientOffset.y - containerRect.top;

                x = Math.max(
                    0,
                    Math.min(x, containerRef.current.clientWidth - elWidth)
                );
                y = Math.max(
                    0,
                    Math.min(y, containerRef.current.clientHeight - elHeight)
                );

                onMove(item.id, { x, y });
            }
        },
        drop(item: BlockItem, monitor) {
            if (monitor.getItemType() === "MENU_ITEM") {
                if (onDrop) onDrop(item);
            }
        },
    });

    const handleSelect = (id: string) => {
        dispatch(setCurrentElementId(id));
    };

    return (
        <div
            ref={(node) => {
                drop(node);
                containerRef.current = node;
            }}
            className={classes.container}
            style={{ position: "relative" }}
        >
            {items.map((item) => (
                <WorkspaceDraggableItem
                    key={item.id}
                    item={item}
                    isSelected={item.id === currentElementId}
                    onSelect={(id: string) => handleSelect(id)}
                />
            ))}
        </div>
    );
};

export default DroppableZone;
