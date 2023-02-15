import { useAuthContext } from "../../context";

function CardDashboard({ label, data, loader }) {
    const { payload } = useAuthContext();

    let className = payload?.role === 1 ? "col-xxl-4 col-md-4" : "col-xxl-6 col-md-6";
    const isUserInt = label.includes("Internos"), isUserExt = label.includes("Externos");
    let cardClassName = isUserInt ? "user-int-card" : isUserExt ? "user-ext-card" : "properties-card";
    let icon = label === "Predios" ? "bi bi-building" : "bi bi-people";

    return (
        < div className={className}>
            <div className={`card info-card ${cardClassName}`}>
                <div className="card-body">
                    <h5 className="card-title">
                        {label}
                    </h5>
                    {data
                        ?
                        <div className="vh-center">
                            <div className="card-icon rounded-circle vh-center">
                                <i className={icon} />
                            </div>
                            <div className="ps-3">
                                <h6>
                                    {data}
                                </h6>
                                <span className="text-success small pt-1 fw-bold">
                                    Registrados
                                </span>
                            </div>
                        </div>
                        :
                        <h3 className="text-center p-2">
                            {loader}{!loader && "¡No hay información!"}
                        </h3>
                    }
                </div>
            </div>
        </div>
    )
}

export default CardDashboard;
