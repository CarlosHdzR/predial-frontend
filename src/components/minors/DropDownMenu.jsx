import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

function DropDownMenu({ path }) {
    const { logout } = useAuthContext();

    return (
        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow me-1 mt-1">
            <li>
                <Link to={path}>
                    <div className="dropdown-item vh-center">
                        <i className="fa-solid fa-user" />
                        Mi Perfil
                    </div>
                </Link>
            </li>
            <li>
                <hr className="dropdown-divider" />
            </li>
            <li>
                <div className="btn dropdown-item vh-center"
                    onClick={() => logout()}>
                    <i className="fa-solid fa-right-from-bracket" />
                    Salir
                </div>
            </li>
        </ul>
    )
}

export default DropDownMenu;
