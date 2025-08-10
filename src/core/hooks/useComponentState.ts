// hooks/useComponentState.ts
import { RootState } from "@/store";
import { setComponentValue } from "@/store/reducers/componentStateReducer";
import { useDispatch, useSelector } from "react-redux";

export function useComponentState<T = unknown>(nodeId: string, field: string) {
  const value = useSelector(
    (state: RootState) => state.componentStateReducer[nodeId]?.[field] ?? ""
  );
  const dispatch = useDispatch();

  const setValue = (val: any) => {
    dispatch(setComponentValue({ nodeId, field, value: val }));
  };

  return [value, setValue] as const;
}
