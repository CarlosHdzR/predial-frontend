function PropertyInfo({ property }) {

    const dataProperty = [
        {
            id: 1,
            label: "Código del Predio",
            data: property.code
        },
        {
            id: 2,
            label: "CC Propietario",
            data: property.owner_id_number
        },
        {
            id: 3,
            label: "Nombre del Propietario",
            data: property.owner_name
        },
        {
            id: 4,
            label: "Área Construida",
            data: property.built_area + "m"
        },
        {
            id: 5,
            label: "Área Total",
            data: property.total_area + "m"
        },
        {
            id: 6,
            label: "Valor del Predio",
            data: "$" + property.value
        },
        {
            id: 7,
            label: "Valor a pagar",
            data: "$" + property.tax_value
        },
        {
            id: 8,
            label: "Dirección del Predio",
            data: property.address
        },
        {
            id: 9,
            label: "Barrio",
            data: property.neighborhood
        },
        {
            id: 10,
            label: "Fecha de Pago max",
            data: property.payment_date_1
        },
        {
            id: 11,
            label: "Fecha de Pago max(Dcto 40%)",
            data: property.payment_date_2
        },
        {
            id: 12,
            label: "Fecha de Pago max(Dcto 20%)",
            data: property.payment_date_3
        },
    ]

    return (
        <div className="row g-3">
            {dataProperty.map((item) => (
                <div key={item.id} className="col-6 col-lg-4">
                    <div className="blue-label">{item.label}</div>
                    <div className="mt-2">{item.data}</div>
                </div>
            ))}
        </div>
    )
}

export default PropertyInfo;
