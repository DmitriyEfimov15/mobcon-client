import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
    CopyElementPayload,
    CreateGroupAndMoveElementPayload,
    ElementListReducerState,
    MoveElementToGroup,
    MovePayload,
    RemoveElementFromGroupPayload,
    RemoveElementPayload,
    RenameElementPayload,
    SetEditingElementIdPayload,
} from "../types/elementListReducer";
import { BlockItem } from "@/types/utilsTypes/dragAndDrop.types";
import { v4 as uuidv4 } from "uuid";

const initialState: ElementListReducerState = {
    allElements: [],
    currentElementId: null,
    editingElementId: null,
};

export const elementListReducer = createSlice({
    name: "elementList",
    initialState,
    reducers: {
        setAllElements: (state, action: PayloadAction<BlockItem[]>) => {
            state.allElements = action.payload;
        },
        setCurrentElementId: (state, action: PayloadAction<string | null>) => {
            state.currentElementId = action.payload;
        },
        addNewElement: (state, action: PayloadAction<BlockItem>) => {
            const item = action.payload;

            const sameTypeCount = state.allElements.filter(
                (existing) => existing.label === item.label
            ).length;

            const nextNumber = sameTypeCount + 1;

            state.allElements.push({
                id: `${item.id}_${uuidv4()}`,
                type: item.type,
                label: item.label || "Без названия",
                name: `${item.label || "Элемент"} ${nextNumber}`,
                props: item.props ?? {},
                position: item.position ?? { x: 0, y: 0 },
                parentId: null,
            });
        },
        moveElement: (state, action: PayloadAction<MovePayload>) => {
            const { id, position } = action.payload;
            const element = state.allElements.find((el) => el.id === id);
            if (element) {
                element.position = position;
            }
            state.currentElementId = id;
        },
        addNewGroupAndMoveElement: (
            state,
            action: PayloadAction<CreateGroupAndMoveElementPayload>
        ) => {
            const { elementId, group } = action.payload;
            const newGroup: BlockItem = {
                id: `group_${uuidv4()}`,
                type: "group",
                label: group,
                parentId: null,
            };

            state.allElements.push(newGroup);
            const element = state.allElements.find((el) => el.id === elementId);
            if (element) element.parentId = newGroup.id;
        },
        moveElementToGroup: (
            state,
            action: PayloadAction<MoveElementToGroup>
        ) => {
            const { elementId, groupId } = action.payload;
            const element = state.allElements.find((el) => el.id === elementId);
            if (element) element.parentId = groupId;
        },
        removeElementFromGroup: (
            state,
            action: PayloadAction<RemoveElementFromGroupPayload>
        ) => {
            const { elementId } = action.payload;
            const element = state.allElements.find((el) => el.id === elementId);
            if (element) element.parentId = null;
        },
        removeElement: (state, action: PayloadAction<RemoveElementPayload>) => {
            state.allElements = state.allElements.filter(
                (el) => el.id !== action.payload.elementId
            );
        },
        copyElement: (state, action: PayloadAction<CopyElementPayload>) => {
            const elementIdToCopy = action.payload.elementId;

            const elementToCopy = state.allElements.find(
                (el) => el.id === elementIdToCopy
            );
            if (!elementToCopy) return;

            const newIdMap = new Map<string, string>();

            function copyRecursive(
                element: BlockItem,
                newParentId: string | null = null
            ): BlockItem {
                const newId = `${element.type}_${uuidv4()}`;
                newIdMap.set(element.id, newId);

                const copy: BlockItem = {
                    ...element,
                    id: newId,
                    parentId: newParentId,
                    label:
                        element.type === "group" && element.label
                            ? `${element.label} копия`
                            : element.label,
                    name:
                        element.type !== "group" && element.name
                            ? `${element.name} копия`
                            : element.name,
                    props: { ...element.props },
                    position: element.position
                        ? { ...element.position }
                        : undefined,
                };

                if (element.type === "group") {
                    const children = state.allElements.filter(
                        (el) => el.parentId === element.id
                    );
                    children.forEach((child) => {
                        const childCopy = copyRecursive(child, newId);
                        state.allElements.push(childCopy);
                    });
                }

                return copy;
            }

            const copiedElement = copyRecursive(
                elementToCopy,
                elementToCopy.parentId
            );

            state.allElements.push(copiedElement);
        },
        setEditingElementId: (
            state,
            action: PayloadAction<SetEditingElementIdPayload>
        ) => {
            state.editingElementId = action.payload.editingElementId;
        },
        renameElement: (state, action: PayloadAction<RenameElementPayload>) => {
            const el = state.allElements.find(
                (e) => e.id === action.payload.elementId
            );
            if (el) {
                if (el.type === "group") {
                    el.label = action.payload.newName;
                } else {
                    el.name = action.payload.newName;
                }
            }
        },
    },
});

export const {
    setAllElements,
    setCurrentElementId,
    addNewElement,
    moveElement,
    addNewGroupAndMoveElement,
    moveElementToGroup,
    removeElement,
    removeElementFromGroup,
    copyElement,
    setEditingElementId,
    renameElement,
} = elementListReducer.actions;

export default elementListReducer.reducer;
