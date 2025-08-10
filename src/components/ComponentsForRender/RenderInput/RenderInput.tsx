// components/RenderInput.tsx
import React from "react";
import Input from "@/UI/UiKitForRender/Input/Input";
import { useComponentState } from "@/core/hooks/useComponentState";

interface RenderInputProps {
    nodeId: string;
    props: Record<string, any>;
}

const RenderInput: React.FC<RenderInputProps> = ({ nodeId, props }) => {
    const [value, setValue] = useComponentState<string>(nodeId, "value");

    const safeValue =
        typeof value === "string" || typeof value === "number" ? value : "";

    return (
        <Input
            {...props}
            value={safeValue}
            onChange={(e) => setValue((e.target as HTMLInputElement).value)}
        />
    );
};

export default RenderInput;
