import { LandingPage, AssociateProperties, MyProperties, MyProfile } from "../pages";

export const userExtRoutes = [
    {
        path: "/user-ext/home",
        element: <LandingPage />
    },
    {
        path: "/user-ext/profile/:id_number",
        element: <MyProfile />
    },
    {
        path: "/user-ext/asociar-predios",
        element: <AssociateProperties />
    },
    {
        path: "/user-ext/pagar",
        element: <MyProperties />
    }
]
