import { ContextMenu } from "@/containers/Project/types";
import { BlockItem } from "@/types/utilsTypes/dragAndDrop.types";

export interface ProjectComponentProps {
    valueSize: string;
    currentWidth: string;
    currentHeight: string;
    workspaceItems: BlockItem[];
    scaleValue: number | null;
    treeContextMenu: ContextMenu;
    isAddGroupModalVisible: boolean;
    handleMove: (id: string, newPos: { x: number; y: number }) => void;
    handleDrop: (item: BlockItem) => void;
    handleChangeSizeValue: (value: string) => void;
    onChangeScale: (value: number | null) => void;
    setTreeMenuContext: (treeMenuContext: ContextMenu) => void;
    handleMenuClick: (info: any) => void;
    setContextId: (contextId: string | null) => void;
    handleCloseAddGroupModal: () => void;
}

export interface DragNDropMenuProps
    extends Pick<
        ProjectComponentProps,
        | "valueSize"
        | "scaleValue"
        | "onChangeScale"
        | "handleChangeSizeValue"
        | "treeContextMenu"
        | "setTreeMenuContext"
        | "handleMenuClick"
        | "setContextId"
        | "isAddGroupModalVisible"
        | "handleCloseAddGroupModal"
    > {}

export type ElementListProps = Omit<
    DragNDropMenuProps,
    | "workspaceItems"
    | "treeContextMenu"
    | "setTreeMenuContext"
    | "handleMenuClick"
    | "setContextId"
    | "isAddGroupModalVisible"
    | "handleCloseAddGroupModal"
>;

export interface ElementTreeProps
    extends Pick<
        ProjectComponentProps,
        | "treeContextMenu"
        | "setTreeMenuContext"
        | "handleMenuClick"
        | "setContextId"
        | "isAddGroupModalVisible"
        | "handleCloseAddGroupModal"
    > {
    parentId?: string | null;
}

export interface AddGroupModalProps {
    open: boolean;
    onClose: () => void;
}

export interface AddGroupModalItemsI {
    group: string;
}
