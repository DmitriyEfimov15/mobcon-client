// components/RenderCheckBox.tsx
import React, { FC, ChangeEvent } from "react";
import CheckBox from "@/UI/UiKitForRender/CheckBox/CheckBox";
import { useComponentState } from "@/core/hooks/useComponentState";

interface RenderCheckBoxProps {
  nodeId: string;
  props: Record<string, any>;
}

const RenderCheckBox: FC<RenderCheckBoxProps> = ({ nodeId, props }) => {
  const [checked, setChecked] = useComponentState<boolean>(nodeId, "checked");

  const safeChecked = typeof checked === "boolean" ? checked : false;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };

  return (
    <CheckBox
      {...props}
      checked={safeChecked}
      onChange={handleChange}
    />
  );
};

export default RenderCheckBox;
