import SidebarItem from './SidebarItem';
import { config } from '../../config';
import { useAuthContext } from '../../context/AuthContext';

function Sidebar() {
    const { payload, auth } = useAuthContext();
    const id_number = payload?.id_number;
    const role = payload?.role;

    const sidebarItemProps = [
        {
            id: 1,
            linkTo: "/admin/dashboard",
            icon: "bi bi-grid-fill",
            label: "Dashboard"
        },
        {
            id: 2,
            linkTo: `/admin/profile/${id_number}`,
            icon: "fa-solid fa-circle-user",
            label: "Mi Perfil"
        },
        {
            id: 3,
            linkTo: "/admin/create-user",
            icon: "fa-solid fa-user-plus",
            label: "Crear Usuario"
        },
        {
            id: 4,
            linkTo: "/admin/manage-users",
            icon: "fa-solid fa-user-group",
            label: "Gestionar Usuarios"
        },
        {
            id: 5,
            linkTo: "/admin/create-property",
            icon: "fa-solid fa-circle-plus",
            label: "Crear Predio"
        },
        {
            id: 6,
            linkTo: "/admin/manage-properties",
            icon: "fa-solid fa-city",
            label: "Gestionar Predios"
        },
    ]

    if (!auth || role === 3) return null;

    return (
        <aside className="sidebar">
            <img src={config.ASSETS.LOGO_SIDEBAR} alt="logo-escudo-cauca"
                className="logo-sidebar img-fluid"
            />
            <ul className="sidebar-nav">
                {role === 1 ?
                    sidebarItemProps.map((item) => (
                        <SidebarItem
                            id={item.id}
                            key={item.id}
                            linkTo={item.linkTo}
                            icon={item.icon}
                            label={item.label}
                        />
                    ))
                    :
                    sidebarItemProps.filter((item) => (
                        item.id !== 3 && item
                    )).map((item) => (
                        <SidebarItem
                            id={item.id}
                            key={item.id}
                            linkTo={item.linkTo}
                            icon={item.icon}
                            label={item.label}
                        />
                    ))
                }
            </ul>
        </aside>
    )
}

export default Sidebar;
