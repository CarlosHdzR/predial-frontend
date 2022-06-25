import { NavLink } from "react-router-dom";

function SidebarItem({ id, linkTo, icon, label }) {
    return (
        <li className="nav-item">
            <NavLink id={id} to={linkTo}
                className={({ isActive }) => `sidebar-nav nav-link collapsed p-3 ${isActive ? "active" : ""}`}>
                <div className="col-2">
                    <i className={icon} />
                </div>
                <div className="col">
                    <span>{label}</span>
                </div>
            </NavLink>
        </li>
    )
};

export default SidebarItem;
