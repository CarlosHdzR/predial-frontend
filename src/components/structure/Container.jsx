import { useUsersContext } from "../../context/UsersContext";
import { useAuthContext } from "../../context/AuthContext";
import { Message } from "../minors";
import { PageTitle } from "./";
import { useLocation } from "react-router-dom";

function Container({ title, subtitle, children }) {
    const { error, msgError } = useUsersContext();
    const { payload, auth } = useAuthContext();
    const role = payload?.role;
    const { pathname } = useLocation();

    let errorMessage = (auth && title !== "Crear Usuario" && title !== "Crear Predio"
        && title !== "Editar Usuario" && title !== "Editar Predio" && title !== "Asociar Predios"
        && !pathname.includes("home") && error)
        &&
        <Message msg={msgError} bgColor="#dc3545" />;

    const isAdminPage = auth && role !== 3;

    return (
        <main id={`${isAdminPage && "main"}`} className={`${!isAdminPage && "vh-center"} min-vh-100`} >
            <div className={`${!isAdminPage && "container"}`}>
                <div className={`${role === 3 && "mt-5"}`}>
                    {errorMessage}
                </div>
                <PageTitle
                    title={title}
                    subtitle={subtitle}
                    isAdminPage={isAdminPage}
                />
                {!isAdminPage
                    ?
                    <>{children}</>
                    :
                    <>
                        {title === "Dashboard" || title === "Mi Perfil" ?
                            <>{children}</>
                            :
                            <>
                                <div className="card">
                                    <div className="card-body">
                                        {children}
                                    </div>
                                </div>
                            </>
                        }
                    </>
                }
            </div>
        </main>
    )
}

export default Container;
