function CardDashboard({ className, cardClassName, label, icon, data }) {
    return (
        < div className={className}>
            <div className={`card info-card ${cardClassName}`}>
                <div className="card-body">
                    <h5 className="card-title">
                        {label}
                    </h5>
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
                </div>
            </div>
        </div>
    )
}

export default CardDashboard