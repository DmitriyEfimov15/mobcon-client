import { LazySendRequestToChangePasswordContainer } from "@/containers/Auth/SendRequestToChangePassword";
import { LazyLoginFormContainer } from "@/containers/Auth/Login";
import { LazyRegistrationFormContainer } from "@/containers/Auth/Registration";
import { LazyVerifyEmailContainer } from "@/containers/Auth/VerifyEmail";
import { ALL_PROJECTS_PAGE, CHANGE_EMAIL_PAGE, DASHBORD_PAGE, LOGIN_ROUTE, PROFILE_PAGE, PROJECT_PAGE, PROJECTS_PAGE, REGISTRATION_ROUTE, RESET_PASSWORD_ROUTE, SEND_REQUEST_TO_CHANGE_PASSWORD_ROUTE, SETTINGS_PAGE, VERIFY_EMAIL_ROUTE } from "@/utils/routes";
import { Navigate, RouteObject } from "react-router-dom";
import { LazyResetPasswordContainer } from "@/containers/Auth/ResetPassword";
import { LazyProjectContainer } from "@/containers/Projects";
import { LazyDashboardContainer } from "@/containers/Projects/Dashboard";
import { LazySettingsContainer } from "@/containers/Settings";
import { LazyProfileSettingsContainer } from "@/containers/Settings/ProfileSettings";
import { LazyChangeEmailContainer } from "@/containers/Settings/ChangeEmail";
import { LazyAllProjectsContainer } from "@/containers/Projects/AllProjects";

export const unAuthRoutes: RouteObject[] = [
    {
        path: "/",
        element: <Navigate to={REGISTRATION_ROUTE} />,
    },
    {
        path: REGISTRATION_ROUTE,
        element: <LazyRegistrationFormContainer />,
    },
    {
        path: LOGIN_ROUTE,
        element: <LazyLoginFormContainer />,
    },
    {
        path: VERIFY_EMAIL_ROUTE,
        element: <LazyVerifyEmailContainer />
    },
    {
        path: SEND_REQUEST_TO_CHANGE_PASSWORD_ROUTE,
        element: <LazySendRequestToChangePasswordContainer/>
    },
    {
        path: RESET_PASSWORD_ROUTE,
        element: <LazyResetPasswordContainer/>
    },
    {
        path: "/",
        element: <Navigate to={REGISTRATION_ROUTE} />,
    },
    {
        path: "/*",
        element: <Navigate to={REGISTRATION_ROUTE} />,
    },
];

export const authRoutes: RouteObject[] = [
    {
        path: "/",
        element: <Navigate to={DASHBORD_PAGE} />,
    },
    {
        path: PROJECTS_PAGE,
        element: <LazyProjectContainer />,
        children: [
            {
                path: DASHBORD_PAGE,
                element: <LazyDashboardContainer />
            },
            {
                path: ALL_PROJECTS_PAGE,
                element: <LazyAllProjectsContainer/>
            }
        ]
    },
    {
        path: SETTINGS_PAGE,
        element: <LazySettingsContainer />,
        children: [
            {
                path: PROFILE_PAGE,
                element: <LazyProfileSettingsContainer/>
            },
        ]
    },
    {
        path: CHANGE_EMAIL_PAGE,
        element: <LazyChangeEmailContainer />
    },
    {
        path: PROJECT_PAGE,
        element: <div>Проект</div>
    },
    {
        path: "/*",
        element: <Navigate to={DASHBORD_PAGE} />,
    },
];
