import SidebarItem from './SidebarItem';
import jwtDecode from 'jwt-decode';
import { config } from '../../config';
import { sidebarItemProps } from './props';

function Sidebar() {
    const token = localStorage.getItem("token");
    const payload = jwtDecode(token);

    return (
        <aside className="sidebar">
            <img src={config.ASSETS.LOGO_SIDEBAR} alt="logo-escudo-cauca"
                className="logo-sidebar img-fluid"
            />
            <ul className="sidebar-nav">
                {payload.rol === 1 ?
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
