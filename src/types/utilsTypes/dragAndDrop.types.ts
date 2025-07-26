export interface BlockItem {
    id: string;
    type: string;
    label: string;
    props: ItemProps | Record<string, any>;
    icon?: string;
    position?: { x: number; y: number };
}

export interface BlockGroup {
    group: string;
    blocks: BlockItem[];
}

export interface ItemProps {
    style?: React.CSSProperties
    text?: string
    value?: string | number
    onChange?: (value: string | number) => void
    onClick?: () => void
}
