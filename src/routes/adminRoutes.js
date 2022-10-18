import {
    CreateProperty, CreateUser, Dashboard, EditProperty,
    EditUser, ManageProperties, ManageUsers, MyProfile
} from "../pages";
import UserProfile from "../pages/UserProfile";

export const adminRoutes = [
    {
        path: "/admin/dashboard",
        element: <Dashboard />,
        title: "Dashboard"
    },
    {
        path: "/admin/profile/:id_number",
        element: <MyProfile />,
        title: "Mi Perfil"
    },
    {
        path: "/admin/create-user",
        element: <CreateUser />,
        title: "Crear Usuario"
    },
    {
        path: "/admin/manage-users",
        element: <ManageUsers />,
        title: "Gestionar Usuarios"
    },
    {
        path: "/admin/manage-users/edit/:id_number",
        element: <EditUser />,
        title: "Editar Usuario",
        subtitle: "Gestionar Usuarios"
    },
    {
        path: "/admin/manage-users/profile/:id_number",
        element: <UserProfile />,
        title: "Perfil de Usuario",
        subtitle: "Gestionar Usuarios"
    },
    {
        path: "/admin/create-property",
        element: <CreateProperty />,
        title: "Crear Predio"
    },
    {
        path: "/admin/manage-properties",
        element: <ManageProperties />,
        title: "Gestionar Predios"
    },
    {
        path: "/admin/manage-properties/edit/:code",
        element: <EditProperty />,
        title: "Editar Predio",
        subtitle: "Gestionar Predios"
    }
]
