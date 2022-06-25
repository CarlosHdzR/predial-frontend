import { TableHeaders, TableRows } from './';
import { prediosHeadersProps, usersHeadersProps } from './';
import { Tooltip } from '../minors';

function Table({ loader, data, setDataToEdit, deleteData, setSorting,
    firstItemShowedPerPage, lastItemShowedPerPage, filterItems, item }) {
    const headerProps = item === "user" ? usersHeadersProps : prediosHeadersProps

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
                <tbody>
                    {data.length > 0 ?
                        <>
                            {filterItems.slice(firstItemShowedPerPage, lastItemShowedPerPage).map((element, index) => {
                                return (
                                    <TableRows
                                        key={element._id}
                                        nro_registro={index + 1 + firstItemShowedPerPage}
                                        data={element}
                                        setDataToEdit={setDataToEdit}
                                        deleteData={deleteData}
                                        item={item}
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
