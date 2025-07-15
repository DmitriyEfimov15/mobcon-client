import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from './reducers/AuthReducer'
import appReducer from './reducers/appReducer'
import { dasboardApi } from "@/containers/Projects/Dashboard/dasboard.api";
import { allProjectsApi } from "@/containers/Projects/AllProjects/allProjects.api";

export const rootReducer = combineReducers({
    authReducer,
    appReducer,
    [dasboardApi.reducerPath]: dasboardApi.reducer,
    [allProjectsApi.reducerPath]: allProjectsApi.reducer,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => 
            getDefaultMiddleware().concat([
                dasboardApi.middleware,
                allProjectsApi.middleware,
            ])
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']