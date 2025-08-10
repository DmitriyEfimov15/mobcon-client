import Select from "@/UI/UiKitForRender/Select/Select";
import { useComponentState } from "@/core/hooks/useComponentState";
import { FC } from "react";

interface RenderSelectProps {
    nodeId: string;
    props: Record<string, any>;
}

const RenderSelect: FC<RenderSelectProps> = ({ nodeId, props }) => {
    const [value, setValue] = useComponentState<string | number>(nodeId, "value");

    const safeValue =
        typeof value === "string" || typeof value === "number" ? value : "";

    return (
        <Select
            {...props}
            options={props?.options}
            value={safeValue}
            onChange={(val: string | number) => setValue(val)}
        />
    );
};

export default RenderSelect;
