import { useState } from 'react';
import { DropDownMenu } from '../minors';
import { getLoggedUser } from '../../auth';
import { config } from '../../config';

function NavbarAdmin({ usersDb, payload, hideMenu, setHideMenu }) {
    const [hoverBtn, setHoverBtn] = useState(false)
    const { avatar, nombres } = getLoggedUser(usersDb, payload) || {};
    const { secure_url } = avatar || {}
    const { LOGO_GOV_CO, DEFAULT_AVATAR } = config.ASSETS

    return (
        <header className="navbar fixed-top">
            <div className="logo-navbar" id="admin">
                <img src={LOGO_GOV_CO} alt="logo-gov-co" className="img-fluid" />
            </div>
            <div className="toggle-btn"
                onClick={() => { setHideMenu(!hideMenu) }}
                onMouseOver={() => { setHoverBtn(!hoverBtn) }}
                onMouseOut={() => { setHoverBtn(!hoverBtn) }}
            >
                <i className={`fa-solid ${(!hoverBtn) ? "fa-bars" : "fa-bars fa-shake"}`} />
            </div>
            <nav className="header-nav ms-auto">
                <div className="nav-profile vh-center" data-bs-toggle="dropdown">
                    <img src={secure_url || DEFAULT_AVATAR} alt="avatar" className="rounded-circle" />
                    <span className="dropdown-toggle ps-2">{nombres}</span>
                </div>
                <DropDownMenu path="/admin/my-profile" />
            </nav>
        </header>
    )
}

export default NavbarAdmin;
