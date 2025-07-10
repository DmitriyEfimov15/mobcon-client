import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthData, AuthUserData } from "../types/AuthTypes";


const initialState: AuthData = {
    user: {
        email: '',
        username: '',
        activationLink: '',
    },
    error: null,
    isLoading: false,
    isAuth: false,
    isChangingUsernameLoading: false,
    isChangingEmailLoading: false,
    isChangingPasswordLoading: false,
    isLogoutLoading: false,
    success: null, 
}

export const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<boolean>) => {
            state.isAuth = action.payload
        },

        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
        },

        setUser: (state, action: PayloadAction<AuthUserData>) => {
            state.user = action.payload
        },

        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload
        },

        setUsername: (state, action: PayloadAction<string>) => {
            state.user.username = action.payload
        },

        setEmail: (state, action: PayloadAction<string>) => {
            state.user.email = action.payload
        },

        setIsChangingUsernameLoading: (state, action: PayloadAction<boolean>) => {
            state.isChangingUsernameLoading = action.payload
        },

        setIsChangingEmailLoading: (state, action: PayloadAction<boolean>) => {
            state.isChangingEmailLoading = action.payload
        },

        setSuccess: (state, action: PayloadAction<string | null>) => {
            state.success = action.payload
        },

        setIsChangingPasswordLoading: (state, action: PayloadAction<boolean>) => {
            state.isChangingPasswordLoading = action.payload
        },

        setIsLogoutLoading: (state, action: PayloadAction<boolean>) => {
            state.isLogoutLoading = action.payload
        },
    }
})

export default authSlice.reducer;