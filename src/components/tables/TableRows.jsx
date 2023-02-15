import { useNavigate } from 'react-router-dom';
import { PropertiesServices, UsersServices } from '../../services';
import { Tooltip } from '../minors';
import { useAuthContext, usePropertiesContext, useUsersContext } from '../../context';
import { useTable } from '../../hooks';

const TableRows = ({ data, nro_registro }) => {
    const { setUserToEdit } = useUsersContext();
    const { setPropertyToEdit } = usePropertiesContext();
    const { payload } = useAuthContext();
    const isAdmin = payload?.role === 1;
    const { isUser } = useTable();
    const { _id,
        name, surname, id_number, email, role, // <== Users
        code, owner_name, owner_id_number, address // <== Properties
    } = data || {};
    const { deleteUser } = UsersServices();
    const { deleteProperty } = PropertiesServices();
    const dataToHandle = isUser ? { _id, param: id_number } : { _id, param: code }
    const navigate = useNavigate();

    const datos = isUser
        ?
        [`${name} ${surname}`, id_number, email, role]
        :
        [code, owner_name, owner_id_number, address];

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
            className: "align-middle",
            dato: datos[2]
        },
        {
            className: `align-middle}`,
            dato: datos[3]
        },
    ];

    const handleEdit = () => {
        if (isUser) {
            setUserToEdit(data);
            if (isAdmin) {
                navigate(`edit/${dataToHandle.param}`);
            } else {
                navigate(`profile/${dataToHandle.param}`);
            }
        } else {
            setPropertyToEdit(data);
            navigate(`edit/${dataToHandle.param}`);
        }
    }

    const handleDelete = () => {
        if (isUser) {
            deleteUser(dataToHandle);
        } else {
            deleteProperty(dataToHandle);
        }
    }

    return (
        <tr>
            <th className="align-middle">{nro_registro}</th>
            {cells.map((cell, index) => (
                <td key={index} className={cell.className}>{cell.dato}</td>
            ))}
            <td className="align-middle">
                <Tooltip id="toolTipEdit" place="top">
                    {(!isAdmin && isUser) ? "Ver" : "Editar"}
                </Tooltip>
                <button
                    data-tip data-for="toolTipEdit"
                    type="button"
                    className="m-1 my-btn-edit"
                    onClick={handleEdit}
                >
                    <i className={`${(isUser && !isAdmin) ? "bi bi-eye-fill" : "bi bi-pencil-fill"}`} />
                </button>
                <Tooltip id="toolTipDelete" place="top">
                    Eliminar
                </Tooltip>
                <button
                    data-tip data-for="toolTipDelete"
                    type="button"
                    className={`${(!isAdmin && isUser) ? "my-btn-disabled" : "my-btn-delete"}`}
                    disabled={(!isAdmin && isUser) ? true : false}
                    onClick={handleDelete}
                >
                    <i className="bi bi-trash" />
                </button>
            </td>
        </tr>
    );
};

export default TableRows;
