import { BlockItem, PositionI } from "@/types/utilsTypes/dragAndDrop.types";

export interface ElementListReducerState {
    currentElementId: string | null;
    allElements: BlockItem[];
    editingElementId: string | null;
}

export interface MovePayload {
    id: string;
    position: PositionI;
}

export interface CreateGroupAndMoveElementPayload {
    group: string;
    elementId: string;
}

export interface MoveElementToGroup
    extends Pick<CreateGroupAndMoveElementPayload, "elementId"> {
    groupId: string;
}

export interface RemoveElementFromGroupPayload
    extends Pick<CreateGroupAndMoveElementPayload, "elementId"> {}

export type RemoveElementPayload = RemoveElementFromGroupPayload;

export interface CopyElementPayload
    extends Pick<CreateGroupAndMoveElementPayload, "elementId"> {}

export interface SetEditingElementIdPayload {
    editingElementId: string | null
}

export interface RenameElementPayload {
    elementId: string;
    newName: string;
}
