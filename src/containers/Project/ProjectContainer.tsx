import Project from "@/components/Project/Project";
import { sizeContants } from "@/components/Project/contants";
import { useAppDispatch, useAppSelector } from "@/core/hooks/reducers";
import {
    addNewElement,
    copyElement,
    moveElement,
    moveElementToGroup,
    removeElement,
    removeElementFromGroup,
    setCurrentElementId,
    setEditingElementId,
} from "@/store/reducers/elementListReducer";
import { BlockItem } from "@/types/utilsTypes/dragAndDrop.types";
import { FC, useEffect, useState } from "react";
import { ContextMenu } from "./types";
import { MenuProps } from "antd";
import {
    CopyElementPayload,
    MoveElementToGroup,
    MovePayload,
    RemoveElementFromGroupPayload,
    RemoveElementPayload,
    SetEditingElementIdPayload,
} from "@/store/types/elementListReducer";

const ProjectContainer: FC = () => {
    const [valueSize, setValueSize] = useState<string>("");
    const [currentWidth, setCurrentWidth] = useState<string>("10");
    const [currentHeight, setCurrentHeigth] = useState<string>("10");
    const [scaleValue, setScaleValue] = useState<number | null>(100);
    const [treeContextMenu, setTreeMenuContext] = useState<ContextMenu>({
        visible: false,
        x: 0,
        y: 0,
        targetId: null,
    });
    const [contextId, setContextId] = useState<string | null>(null);
    const [isAddGroupModalVisible, setIsAddGroupModalVisible] =
        useState<boolean>(false);

    const dispatch = useAppDispatch();
    const { allElements } = useAppSelector(
        (state) => state.elementListReducer.present
    );

    const handleChangeSizeValue = (value: string) => {
        setValueSize(value);
        const splitedSizeValue = value.split("x");
        setCurrentWidth(splitedSizeValue[0]);
        setCurrentHeigth(splitedSizeValue[1]);
    };

    useEffect(() => {
        handleChangeSizeValue(sizeContants[0].value);
    }, []);

    const onChangeScale = (value: number | null) => {
        setScaleValue(value);
    };

    const handleDrop = (item: BlockItem) => {
        dispatch(addNewElement(item));
    };

    const handleMove = (id: string, newPos: { x: number; y: number }) => {
        const payload: MovePayload = {
            id,
            position: newPos,
        };
        dispatch(moveElement(payload));
    };

    const handleMenuClick: MenuProps["onClick"] = (info) => {
        const targetId = contextId;
        dispatch(setCurrentElementId(targetId));

        if (info.key.startsWith("move_to_") && targetId) {
            const groupId = info.key.replace("move_to_", "");
            const payload: MoveElementToGroup = {
                elementId: targetId,
                groupId: groupId,
            };
            dispatch(moveElementToGroup(payload));
            setContextId(null);
            return;
        }

        switch (info.key) {
            case "create_and_move":
                setIsAddGroupModalVisible(true);
                break;
            case "copy":
                if (targetId) {
                    const payload: CopyElementPayload = {
                        elementId: targetId,
                    };
                    dispatch(copyElement(payload));
                }
                break;
            case "delete":
                if (targetId) {
                    const payload: RemoveElementPayload = {
                        elementId: targetId,
                    };
                    dispatch(removeElement(payload));
                }
                break;
            case "remove_from_group":
                if (targetId) {
                    const payload: RemoveElementFromGroupPayload = {
                        elementId: targetId,
                    };
                    dispatch(removeElementFromGroup(payload));
                }
                break;
            case "rename":
                if (targetId) {
                    const payload: SetEditingElementIdPayload = {
                        editingElementId: targetId
                    }
                    dispatch(setEditingElementId(payload));
                }
                break;
        }

        setContextId(null);
    };
    const handleCloseAddGroupModal = () => {
        setIsAddGroupModalVisible(false);
    };

    return (
        <Project
            valueSize={valueSize}
            currentWidth={currentWidth}
            currentHeight={currentHeight}
            workspaceItems={allElements.filter((el) => el.type !== "group")}
            scaleValue={scaleValue}
            treeContextMenu={treeContextMenu}
            isAddGroupModalVisible={isAddGroupModalVisible}
            setTreeMenuContext={setTreeMenuContext}
            handleMove={handleMove}
            handleDrop={handleDrop}
            handleChangeSizeValue={handleChangeSizeValue}
            onChangeScale={onChangeScale}
            handleMenuClick={handleMenuClick}
            setContextId={setContextId}
            handleCloseAddGroupModal={handleCloseAddGroupModal}
        />
    );
};

export default ProjectContainer;
