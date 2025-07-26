import Project from "@/components/Project/Project";
import { sizeContants } from "@/components/Project/sizeContants";
import { BlockItem } from "@/types/utilsTypes/dragAndDrop.types";
import { FC, useEffect, useState } from "react";

const ProjectContainer: FC = () => {
    const [workspaceItems, setWorkspaceItems] = useState<BlockItem[]>([]);
    const [valueSize, setValueSize] = useState<string>("");
    const [currentWidth, setCurrentWidth] = useState<string>("10");
    const [currentHeight, setCurrentHeigth] = useState<string>("10");
    const [scaleValue, setScaleValue] = useState<number | null>(100);

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
        setWorkspaceItems(prevItems => [
            ...prevItems,
            {
                id: item.id,
                type: item.type,
                label: item.label || "Без названия",
                props: item.props
            }
        ]);
    };

    return (
        <Project
            valueSize={valueSize}
            currentWidth={currentWidth}
            currentHeight={currentHeight}
            workspaceItems={workspaceItems}
            scaleValue={scaleValue}
            handleDrop={handleDrop}
            handleChangeSizeValue={handleChangeSizeValue}
            onChangeScale={onChangeScale}
        />
    );
};

export default ProjectContainer;
