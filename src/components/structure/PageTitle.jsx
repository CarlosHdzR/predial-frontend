import React from 'react'
import { NavLink } from 'react-router-dom';

function PageTitle({title, subtitle, isAdminPage}) {
    const PATHS = {
        "Editar Usuario": "/admin/manage-users",
        "Perfil de Usuario": "/admin/manage-users",
        "Editar Predio": "/admin/manage-properties"
    }

    return (
        <div className={`${isAdminPage && "pagetitle"}`}>
            <h1 className={`${!isAdminPage && "text-center font-weight-bold mt-5"}`}>
                {title}
            </h1>
            {subtitle &&
                <nav>
                    <ol className="breadcrumb">
                        <NavLink to={PATHS[title]}>
                            {subtitle}
                        </NavLink>
                        &nbsp;|&nbsp;
                        <NavLink to="#">
                            {title}
                        </NavLink>
                    </ol>
                </nav>
            }
        </div>
    )
}

export default PageTitle;