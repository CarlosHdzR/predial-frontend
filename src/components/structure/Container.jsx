import { Message } from "../minors";
import { PageTitle } from "./";
import { useHandleError } from "../../hooks";
import { useAuthContext } from "../../context";

function Container({ title, subtitle, children }) {
    const { error } = useHandleError();
    const { payload, auth } = useAuthContext();
    const role = payload?.role;

    const regex = /Crear|Editar|Asociar|Mis/
    const condition = regex.test(title) || !title;
    let errorMessage = (auth && !condition && error) && <Message msg={error.msg} bgColor="#dc3545" />;
    let isAdminPage = auth && role !== 3;

    return (
        <div id={`${isAdminPage ? "container-admin" : "container"}`} className={`${!isAdminPage && "vh-center"} min-vh-100`} >
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
        </div>
    )
}

export default Container;
