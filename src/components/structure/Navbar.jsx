import { useState } from 'react';
import { ToggleButton, DropDownMenu } from '../minors';
import { Link, NavLink } from 'react-router-dom';
import { Auth, getLoggedUser } from '../../auth';
import { navItemProps } from './props';
import { config } from '../../config';

function Navbar({ text, path, usersDb, payload }) {
    const [showLinks, setShowLinks] = useState(false)
    const { auth } = Auth()
    const { avatar, nombres } = getLoggedUser(usersDb, payload) || {};
    const { secure_url } = avatar || {};
    const { LOGO_GOV_CO, DEFAULT_AVATAR } = config.ASSETS

    return (
        <header className="navbar fixed-top">
            <div className="logo-navbar">
                <img className="img-fluid" src={LOGO_GOV_CO} alt="logo-gov-co" />
            </div>
            {auth() && payload.rol === 3 ?
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
                    <div className="header-nav">
                        <div className="nav-profile vh-center" data-bs-toggle="dropdown">
                            <img src={secure_url || DEFAULT_AVATAR} alt="avatar" className="rounded-circle" />
                            <span className="dropdown-toggle ps-2">{nombres}</span>
                        </div>
                        <DropDownMenu path="/user-ext/my-profile" />
                    </div>
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
