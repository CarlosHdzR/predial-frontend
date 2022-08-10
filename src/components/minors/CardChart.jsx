function CardChart({ label, children }) {
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">
                    {label}
                </h5>
                {children}
            </div>
        </div>

    )
}

export default CardChart;
