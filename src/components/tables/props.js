export const usersHeadersProps = [
    { name: "#", field: "index", sortable: false },
    { name: "Nombre", field: "name", sortable: true, className: "pointer", dataFor: "toolTipSort" },
    { name: "Nro. Documento", field: "id_number", sortable: false },
    { name: "Email", field: "email", sortable: true, className: "pointer", dataFor: "toolTipSort" },
    { name: "Rol", field: "role", sortable: false },
    { name: "" },
];

export const propertiesHeadersProps = [
    { name: "#", field: "index", sortable: false },
    { name: "Código", field: "code", sortable: true, className: "pointer", dataFor: "toolTipSort" },
    { name: "Nombre Propietario", field: "owner_name", sortable: true, className: "pointer", dataFor: "toolTipSort" },
    { name: "Doc. Propietario", field: "owner_id_number", sortable: false },
    { name: "Dirección", field: "address", sortable: false },
    { name: "" },
];

