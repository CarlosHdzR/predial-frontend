import { useState } from 'react';
import { ToggleButton, DropDownMenu } from '../minors';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { config } from '../../config';
import { useAuthContext } from '../../context/AuthContext';

const { LOGO_GOV_CO, DEFAULT_AVATAR } = config.ASSETS;

function Navbar({ hideMenu, setHideMenu }) {
    const { payload, auth, loggedUser } = useAuthContext();
    const { avatar, name, id_number } = loggedUser || {};
    const { secure_url } = avatar || {};
    const [hoverBtn, setHoverBtn] = useState(false); // Hover ToggleBtn
    const [showLinks, setShowLinks] = useState(false);
    const { pathname } = useLocation();

    const navItemProps = [
        {
            id: 1,
            path: "/user-ext/home",
            label: "Inicio",
        },
        {
            id: 2,
            path: "/user-ext/associate-properties",
            label: "Asociar Predios",
        },
        {
            id: 3,
            path: "/user-ext/my-properties",
            label: "Mis Predios",
        },
    ]

    let text = pathname.includes("login") ? "Registrarse" : "Iniciar Sesión";
    let path = pathname.includes("login") ? "/register" : "/login";

    return (
        <header className="navbar fixed-top">
            <div className="logo-navbar">
                <img className="img-fluid" src={LOGO_GOV_CO} alt="logo-gov-co" />
            </div>
            {auth ?
                <>
                    {payload.role === 3
                        ?
                        <>
                            <ToggleButton showLinks={showLinks} setShowLinks={setShowLinks} />
                            <div className="links-container">
                                <div className="links" id={showLinks ? "hidden" : ""}>
                                    {navItemProps.map((item) => (
                                        <NavLink to={item.path} key={item.id}
                                            className={({ isActive }) => `${isActive ? "active" : ""}`}
                                            onClick={() => setShowLinks(false)}>
                                            {item.label}
                                        </NavLink>
                                    ))}
                                </div>
                            </div>
                        </>
                        :
                        <div className="toggle-btn"
                            onClick={() => { setHideMenu(!hideMenu) }}
                            onMouseOver={() => { setHoverBtn(!hoverBtn) }}
                            onMouseOut={() => { setHoverBtn(!hoverBtn) }}
                        >
                            <i className={`fa-solid ${(!hoverBtn) ? "fa-bars" : "fa-bars fa-shake"}`} />
                        </div>
                    }
                    <nav className="header-nav ms-auto">
                        <div className="nav-profile vh-center" data-bs-toggle="dropdown">
                            <img src={secure_url || DEFAULT_AVATAR} alt="avatar" className="rounded-circle" />
                            <span className="dropdown-toggle ps-2">{name}</span>
                        </div>
                        <DropDownMenu path={`/${payload.role === 3 ? "user-ext" : "admin"}/profile/${id_number}`} />
                    </nav>
                </>
                :
                <>
                    <Link to="/" className="home-icon">
                        <i className="fa-solid fa-house" />
                    </Link>
                    <Link to={path} className="ms-auto btn-link">
                        <i className="fa-solid fa-user me-2" />
                        {text}
                    </Link>
                </>
            }
        </header>
    )
}

export default Navbar;
