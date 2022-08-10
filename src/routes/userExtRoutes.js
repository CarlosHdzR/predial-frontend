import { LandingPage, AsociarPredios, PagarImpuesto, MyProfile } from "../pages";

export const userExtRoutes = [
    {
        path: "/user-ext/home",
        element: <LandingPage />
    },
    {
        path: "/user-ext/profile/:nro_doc",
        element: <MyProfile />
    },
    {
        path: "/user-ext/asociar-predios",
        element: <AsociarPredios />
    },
    {
        path: "/user-ext/pagar",
        element: <PagarImpuesto />
    }
]
