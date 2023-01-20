import { useNavigate } from 'react-router-dom';
import { usePropertiesContext } from '../../context/PropertiesContext';
import { useUsersContext } from '../../context/UsersContext';
import { PropertiesServices, UsersServices } from '../../services';
import { Tooltip } from '../minors';
import { useAuthContext } from '../../context/AuthContext';
import { useTable } from '../../hooks';

const TableRows = ({ data, nro_registro }) => {
    const { setUserToEdit } = useUsersContext();
    const { payload } = useAuthContext();
    const isRole1 = payload?.role === 1;
    const { setPropertyToEdit } = usePropertiesContext();
    const { isUser } = useTable();
    let { _id,
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
            if (payload?.role === 1) {
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
                    {(!isRole1 && isUser) ? "Ver" : "Editar"}
                </Tooltip>
                <button
                    data-tip data-for="toolTipEdit"
                    type="button"
                    className="m-1 my-btn-edit"
                    onClick={handleEdit}
                >
                    <i className={`${(isUser && !isRole1) ? "bi bi-eye-fill" : "bi bi-pencil-fill"}`} />
                </button>
                <Tooltip id="toolTipDelete" place="top">
                    Eliminar
                </Tooltip>
                <button
                    data-tip data-for="toolTipDelete"
                    type="button"
                    className={`${(!isRole1 && isUser) ? "my-btn-disabled" : "my-btn-delete"}`}
                    disabled={(!isRole1 && isUser) ? true : false}
                    onClick={handleDelete}
                >
                    <i className="bi bi-trash" />
                </button>
            </td>
        </tr>
    );
};

export default TableRows;
