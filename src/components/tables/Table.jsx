import { TableHeaders, TableRows } from './';
import { propertiesHeadersProps, usersHeadersProps } from './props';
import { Loader, Tooltip } from '../minors';
import { useHandleError, useTable } from '../../hooks';

function Table({ firstItemShowedPerPage, lastItemShowedPerPage }) {
    const { db, isUser, filterItems, setSorting } = useTable();
    const headerProps = isUser ? usersHeadersProps : propertiesHeadersProps;
    const { isLoading } = useHandleError();
    let loader = isLoading && <Loader />;

    return (
        <>
            <Tooltip id="toolTipSort" place="top">
                Ordenar <i className="bi bi-arrow-down-up" />
            </Tooltip>
            <div className="table-responsive-md">
                <table className="table table-hover text-center">
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
        </>
    )
}

export default Table;
