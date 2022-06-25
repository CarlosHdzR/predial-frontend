function PredioInfo({ predio }) {

    const dataPredio = [
        {
            id: 1,
            label: "Código del Predio",
            data: predio.codigo
        },
        {
            id: 2,
            label: "CC Propietario",
            data: predio.doc_prop
        },
        {
            id: 3,
            label: "Nombre del Propietario",
            data: predio.nom_prop
        },
        {
            id: 4,
            label: "Área Construida",
            data: predio.area_c
        },
        {
            id: 5,
            label: "Área Total",
            data: predio.area_t
        },
        {
            id: 6,
            label: "Valor del Predio",
            data: predio.valor_predio
        },
        {
            id: 7,
            label: "Valor a pagar",
            data: predio.valor_predial
        },
        {
            id: 8,
            label: "Dirección del Predio",
            data: predio.direccion_predio
        },
        {
            id: 9,
            label: "Barrio",
            data: predio.barrio
        },
        {
            id: 10,
            label: "Fecha de Pago max",
            data: predio.fecha_pago
        },
        {
            id: 11,
            label: "Fecha de Pago max(Dcto 40%)",
            data: predio.fecha_pago2
        },
        {
            id: 12,
            label: "Fecha de Pago max(Dcto 20%)",
            data: predio.fecha_pago3
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

export default PredioInfo;
