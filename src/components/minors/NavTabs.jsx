function NavTabs({ handleEdit }) {
    return (
        <ul className="nav nav-tabs nav-tabs-bordered">
            <li className="nav-item mt-1">
                <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#profile-overview">
                    Vista General
                </button>
            </li>
            <li className="nav-item mt-1">
                <button
                    type="button" className="nav-link" data-bs-toggle="tab" data-bs-target="#profile-edit"
                    onClick={handleEdit}>
                    Editar Perfil
                </button>
            </li>
            <li className="nav-item mt-1">
                <button className="nav-link" data-bs-toggle="tab" data-bs-target="#profile-change-password">
                    Cambiar Contraseña
                </button>
            </li>
        </ul>
    )
}

export default NavTabs