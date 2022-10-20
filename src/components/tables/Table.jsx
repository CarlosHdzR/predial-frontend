import { TableHeaders, TableRows } from './';
import { propertiesHeadersProps, usersHeadersProps } from './props';
import { Loader, Tooltip } from '../minors';
import { useHandleError, useTable } from '../../hooks';

function Table({ firstItemShowedPerPage, lastItemShowedPerPage }) {
    const { loading } = useHandleError(); // TODO: Fix loading
    const { db, isUser, filterItems, setSorting } = useTable();
    const headerProps = isUser ? usersHeadersProps : propertiesHeadersProps;
    let loader = loading && <Loader />;

    return (
        <div className="dataTable-container">
            <Tooltip id="toolTipSort" place="top">
                Ordenar <i className="bi bi-arrow-down-up" />
            </Tooltip>
            <Tooltip id="toolTipInfo" place="top">
                Rol 2: Usuario Interno
                <br />
                Rol 3: Usuario Externo
            </Tooltip>
            <table className="table datatable table-hover text-center">
                <TableHeaders headerProps={headerProps} onSorting={(field, order) => setSorting({ field, order })} />
                <tbody className="table-group-divider">
                    {db.length > 0
                        ?
                        <>
                            {filterItems.slice(firstItemShowedPerPage, lastItemShowedPerPage).map((element, index) => {
                                return (
                                    <TableRows
                                        key={element._id}
                                        nro_registro={index + 1 + firstItemShowedPerPage}
                                        data={element}
                                    />
                                )
                            })}
                        </>
                        : (
                            <tr>
                                <td colSpan={6}>
                                    <h2 className="text-center m-5">
                                        {loader}{!loader && "¡No hay información!"}
                                    </h2>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Table;
