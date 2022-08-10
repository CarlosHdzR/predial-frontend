import { ForgotPassword, LandingPage, Login, Register, ResetPassword } from "../pages";

export const systemOutRoutes = [
    {
        path: "/",
        element: <LandingPage />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/forgot-password",
        element: <ForgotPassword />
    },
    {
        path: "/reset-password/:token",
        element: <ResetPassword />
    }
]
