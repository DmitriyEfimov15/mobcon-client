import { useComponentState } from "@/core/hooks/useComponentState";
import { Switch } from "@/UI/UiKitForRender/Switch/Switch";
import { FC } from "react";

interface RenderSwitchProps {
    nodeId: string;
    props: Record<string, any>;
}

const RenderSwitch: FC<RenderSwitchProps> = ({ nodeId, props }) => {
    const [checked, setChecked] = useComponentState<boolean>(nodeId, "checked");

    const safeChecked = typeof checked === "boolean" ? checked : false;

    return (
        <Switch
            {...props}
            checked={safeChecked}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setChecked(e.target.checked)
            }
        />
    );
};

export default RenderSwitch;
