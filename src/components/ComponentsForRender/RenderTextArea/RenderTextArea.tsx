// components/RenderTextArea.tsx
import React from "react";
import TextArea from "@/UI/UiKitForRender/TextArea/TextArea";
import { useComponentState } from "@/core/hooks/useComponentState";

interface RenderTextAreaProps {
    nodeId: string;
    props: Record<string, any>;
}

const RenderTextArea: React.FC<RenderTextAreaProps> = ({ nodeId, props }) => {
    const [value, setValue] = useComponentState<string>(nodeId, "value");

    const safeValue =
        typeof value === "string" || typeof value === "number" ? value : "";

    return (
        <TextArea
            {...props}
            value={safeValue}
            onChange={(e) => setValue((e.target as HTMLTextAreaElement).value)}
        />
    );
};

export default RenderTextArea;
