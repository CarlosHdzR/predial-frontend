function PropertyInfo({ predio }) {

    const dataPredio = [
        {
            id: 1,
            label: "Código del Predio",
            data: predio.code
        },
        {
            id: 2,
            label: "CC Propietario",
            data: predio.owner_id_number
        },
        {
            id: 3,
            label: "Nombre del Propietario",
            data: predio.owner_name
        },
        {
            id: 4,
            label: "Área Construida",
            data: predio.built_area + "m"
        },
        {
            id: 5,
            label: "Área Total",
            data: predio.total_area + "m"
        },
        {
            id: 6,
            label: "Valor del Predio",
            data: "$" + predio.property_value
        },
        {
            id: 7,
            label: "Valor a pagar",
            data: "$" + predio.tax_value
        },
        {
            id: 8,
            label: "Dirección del Predio",
            data: predio.property_address
        },
        {
            id: 9,
            label: "Barrio",
            data: predio.neighborhood
        },
        {
            id: 10,
            label: "Fecha de Pago max",
            data: predio.payment_date_1
        },
        {
            id: 11,
            label: "Fecha de Pago max(Dcto 40%)",
            data: predio.payment_date_2
        },
        {
            id: 12,
            label: "Fecha de Pago max(Dcto 20%)",
            data: predio.payment_date_3
        },
    ]

    return (
        <div className="row g-3">
            {dataPredio.map((item) => (
                <div key={item.id} className="col-6 col-lg-4">
                    <div className="blue-label">{item.label}</div>
                    <div className="mt-2">{item.data}</div>
                </div>
            ))}
        </div>
    )
}

export default PropertyInfo;
