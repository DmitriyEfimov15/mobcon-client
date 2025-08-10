import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ComponentState } from "../types/componentStateReducer.types";

const initialState: ComponentState = {};

const componentStateSlice = createSlice({
  name: "componentState",
  initialState,
  reducers: {
    setComponentValue: (
      state,
      action: PayloadAction<{
        nodeId: string;
        field: string;
        value: any;
      }>
    ) => {
      const { nodeId, field, value } = action.payload;
      if (!state[nodeId]) {
        state[nodeId] = {};
      }
      state[nodeId][field] = value;
    },
    resetComponentState: (state) => {
      return {};
    },
  },
});

export const {
  setComponentValue,
  resetComponentState,
} = componentStateSlice.actions;

export default componentStateSlice.reducer;
