import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "../types/appTypes";
import { INotification } from "@/types/notification.types";

const initialState: AppState = {
    notification: null,
};

export const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setNotification: (state, action: PayloadAction<INotification>) => {
            state.notification = action.payload;
        },
    },
});

export const { setNotification } = appSlice.actions;

export default appSlice.reducer;
