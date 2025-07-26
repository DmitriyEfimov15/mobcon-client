import { BlockItem } from "@/types/utilsTypes/dragAndDrop.types";

export interface ProjectComponentProps {
    valueSize: string;
    currentWidth: string;
    currentHeight: string;
    workspaceItems: BlockItem[];
    scaleValue: number | null;
    handleDrop: (item: BlockItem) => void;
    handleChangeSizeValue: (value: string) => void;
    onChangeScale: (value: number | null) => void;
}

export interface DragNDropMenuProps
    extends Pick<
        ProjectComponentProps,
        "valueSize" | "scaleValue" | "onChangeScale" | "handleChangeSizeValue"
    > {}
