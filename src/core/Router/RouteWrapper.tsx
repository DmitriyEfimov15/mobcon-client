import App from "@/App/App";
import { useAppDispatch, useAppSelector } from "@/core/hooks/reducers";
import { useEffect, useState } from "react";
import {
    createBrowserRouter,
    RouteObject,
    RouterProvider,
} from "react-router-dom";
import { authRoutes, unAuthRoutes } from "./Routes";
import { checkAuth } from "@/store/actions/AuthAction";
import { isMobile } from "react-device-detect";
import MobileBlock from "@/components/MobileBlock/MobileBlock";
import { NotificationPopUp } from "@/UI/NotificationPopUp/NotificationPopUp";

const RouteWrapper = () => {
    const { isAuth } = useAppSelector((state) => state.authReducer);
    const dispatch = useAppDispatch();

    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        dispatch(checkAuth()).finally(() => setLoading(false));
    }, []);

    if (isMobile) {
        return <MobileBlock />;
    }

    if (loading) return;

    const routes: RouteObject[] = [
        {
            path: "/",
            element: <App />,
            children: isAuth ? authRoutes : unAuthRoutes,
        },
    ];
    const router = createBrowserRouter(routes);

    return <RouterProvider router={router} />;
};

export default RouteWrapper;
