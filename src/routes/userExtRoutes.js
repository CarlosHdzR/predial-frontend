import { LandingPage, AssociateProperties, MyProperties, MyProfile } from "../pages";

export const userExtRoutes = [
    {
        path: "/user-ext/home",
        element: <LandingPage />
    },
    {
        path: "/user-ext/profile/:id_number",
        element: <MyProfile />,
        title: "Mi Perfil"
    },
    {
        path: "/user-ext/associate-properties",
        element: <AssociateProperties />,
        title: "Asociar Predios"
    },
    {
        path: "/user-ext/my-properties",
        element: <MyProperties />,
        title: "Mis Predios"
    }
]
