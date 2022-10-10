import {
    CreateProperty, CreateUser, Dashboard, EditProperty,
    EditUser, ManageProperties, ManageUsers, MyProfile
} from "../pages";
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
        element: <CreateProperty />
    },
    {
        path: "/admin/manage-predios",
        element: <ManageProperties />
    },
    {
        path: "/admin/manage-predios/edit/:code",
        element: <EditProperty />
    }
]
