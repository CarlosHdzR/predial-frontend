import { CreatePredio, CreateUser, Dashboard, EditPredio, EditUser, ManagePredios, ManageUsers, MyProfile } from "../pages";
import UserProfile from "../pages/UserProfile";

export const adminRoutes = [
    {
        path: "/admin/dashboard",
        element: <Dashboard />
    },
    {
        path: "/admin/profile/:id_number",
        element: <MyProfile />
    },
    {
        path: "/admin/create-user",
        element: <CreateUser />
    },
    {
        path: "/admin/manage-users",
        element: <ManageUsers />
    },
    {
        path: "/admin/manage-users/edit/:id_number",
        element: <EditUser />
    },
    {
        path: "/admin/manage-users/profile/:id_number",
        element: <UserProfile />
    },
    {
        path: "/admin/create-predio",
        element: <CreatePredio />
    },
    {
        path: "/admin/manage-predios",
        element: <ManagePredios />
    },
    {
        path: "/admin/manage-predios/edit/:codigo",
        element: <EditPredio />
    }
]
