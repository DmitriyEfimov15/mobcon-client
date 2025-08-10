import { FC } from "react";
import classes from "./index.module.scss";
import DroppableZone from "@/UI/DroppableZone/DroppableZone";
import { ProjectComponentProps } from "./types";
import DragNDropMenu from "./DragNDropMenu/DragNDropMenu";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { MultiBackend, TouchTransition } from "dnd-multi-backend";

const Project: FC<ProjectComponentProps> = ({
    valueSize,
    currentWidth,
    currentHeight,
    workspaceItems,
    scaleValue,
    treeContextMenu,
    isAddGroupModalVisible,
    setTreeMenuContext,
    handleMove,
    handleDrop,
    handleChangeSizeValue,
    onChangeScale,
    handleMenuClick,
    setContextId,
    handleCloseAddGroupModal,
}) => {
    const HTML5toTouch = {
        backends: [
            {
                backend: HTML5Backend,
            },
            {
                backend: TouchBackend,
                options: { enableMouseEvents: true },
                preview: true,
                transition: TouchTransition,
            },
        ],
    };
    return (
        <DndProvider backend={MultiBackend} options={HTML5toTouch}>
            <div className={classes.container}>
                <DragNDropMenu
                    scaleValue={scaleValue}
                    valueSize={valueSize}
                    treeContextMenu={treeContextMenu}
                    isAddGroupModalVisible={isAddGroupModalVisible}
                    setTreeMenuContext={setTreeMenuContext}
                    onChangeScale={onChangeScale}
                    handleChangeSizeValue={handleChangeSizeValue}
                    handleMenuClick={handleMenuClick}
                    setContextId={setContextId}
                    handleCloseAddGroupModal={handleCloseAddGroupModal}
                />
                <div className={classes.workspace__container}>
                    <div
                        style={{
                            width: `${currentWidth}px`,
                            height: `${currentHeight}px`,
                            transform: `scale(${
                                scaleValue ? scaleValue / 100 : 1
                            })`,
                        }}
                    >
                        <DroppableZone items={workspaceItems} onDrop={handleDrop} onMove={handleMove}/>
                    </div>
                </div>
                <div className={classes.items__settings}></div>
            </div>
        </DndProvider>
    );
};

export default Project;
