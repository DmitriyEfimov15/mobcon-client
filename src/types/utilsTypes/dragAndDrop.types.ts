export interface BlockItem {
    id: string;
    type: string;
    label: string;
    props?: ItemProps | Record<string, any>;
    icon?: string;
    position?: PositionI;
    name?: string;
    parentId?: string | null;
}

export interface BlockGroup {
    group: string;
    blocks: BlockItem[];
}

export interface ItemProps {
    style?: React.CSSProperties;
    text?: string;
    onClick?: () => void;
}

export interface PositionI {
    x: number;
    y: number;
}
