import { BlockItem } from "@/types/utilsTypes/dragAndDrop.types";
import { FC } from "react";
import classes from './index.module.scss'
import { useDrop } from "react-dnd";
import { renderElement } from "@/utils/renderElement";

interface DroppableZoneProps {
    items: BlockItem[];
    onDrop?: (item: BlockItem) => void;
}

const DroppableZone: FC<DroppableZoneProps> = ({ items, onDrop }) => {
    const [{ isOver }, dropRef] = useDrop(() => ({
      accept: "MENU_ITEM",
      drop: (item: any) => {
        if(onDrop) onDrop(item);
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    }));
  
    return (
      <div
        ref={(node) => {
            dropRef(node);
        }}
        className={classes.container}
      >
        {items.map((item) => (
          <div key={item.id}>{renderElement(item)}</div>
        ))}
      </div>
    );
  };
export default DroppableZone