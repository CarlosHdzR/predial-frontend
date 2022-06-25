import { useNavigate } from 'react-router-dom';
import { getPayload } from '../../auth';
import { Tooltip } from '../minors';

const TableRows = ({ data, nro_registro, setDataToEdit, deleteData, item }) => {
    let { _id,
        nombres, apellidos, nro_doc, email, rol, // <== Users
        codigo, nom_prop, doc_prop, direccion_predio // <== Predios
    } = data || {};
    const dataToHandle = item === "user" ? { _id, param: nro_doc } : { _id, param: codigo }
    const payload = getPayload()
    const navigate = useNavigate()

    const datos = item === "user"
        ?
        [`${nombres} ${apellidos}`, nro_doc, email, rol]
        :
        [codigo, nom_prop, doc_prop, direccion_predio]

    const cells = [
        {
            className: "align-middle",
            dato: datos[0]
        },
        {
            className: "align-middle",
            dato: datos[1]
        },
        {
            className: "align-middle d-none d-sm-table-cell",
            dato: datos[2]
        },
        {
            className: "align-middle d-none d-sm-table-cell",
            dato: datos[3]
        },
    ]

    const handleEdit = () => {
        setDataToEdit(data)
        if (item === "predio" || payload.rol === 1) navigate(`edit/${dataToHandle.param}`)
    }
    const handleDelete = () => {
        deleteData(dataToHandle)
    }

    return (
        <tr>
            <th className="align-middle">{nro_registro}</th>
            {cells.map((cell, index) => (
                <td key={index} className={cell.className}>{cell.dato}</td>
            ))}
            <td className="align-middle">
                <Tooltip id="toolTipEdit" place="top">
                    Editar
                </Tooltip>
                <button
                    data-tip data-for="toolTipEdit"
                    type="button"
                    className={`m-1 ${(payload.rol !== 1 && item === "user") ? "my-btn-disabled" : "my-btn-edit"}`}
                    disabled={(payload.rol !== 1 && item === "user") ? true : false}
                    onClick={handleEdit}
                >
                    <i className="bi bi-pencil-fill" />
                </button>
                <Tooltip id="toolTipDelete" place="top">
                    Eliminar
                </Tooltip>
                <button
                    data-tip data-for="toolTipDelete"
                    type="button"
                    className={`${(payload.rol !== 1 && item === "user") ? "my-btn-disabled" : "my-btn-delete"}`}
                    disabled={(payload.rol !== 1 && item === "user") ? true : false}
                    onClick={handleDelete}
                >
                    <i className="bi bi-trash" />
                </button>
            </td>
        </tr>
    );
};

export default TableRows;
