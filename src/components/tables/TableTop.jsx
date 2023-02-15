import { useRef } from "react";
import { useTable } from "../../hooks";
import { Tooltip } from "../minors";
import { useAuthContext } from "../../context";

function TableTop({ itemsPerPage, handleInputChange }) {
    const { payload } = useAuthContext();
    const { db, isUser, filter, handleFilter, range } = useTable();
    const selectRef = useRef();
    let label = isUser ? "Usuario" : "Predio";

    return (
        <div className="d-flex justify-content-between">
            <div className="col-4 col-sm-3 col-md-2 my-3">
                <select name="select" ref={selectRef} className="form-select text-center" value={itemsPerPage.select} onChange={handleInputChange}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                    <option value={db.length}>Todos</option>
                </select>
                <label className="table-labels-top">{`${label}s`} por página</label>
            </div>
            <div className="col-7 col-md-5 col-lg-4 col-xl-3 my-3">
                <Tooltip id="toolTipFilter" place="left">
                    Para filtrar por <em>rol</em> ingrese el valor seguido de un espacio
                </Tooltip>
                <input
                    data-tip
                    data-for={(payload?.role === 1 && label === "Usuario") && "toolTipFilter"}
                    className="form-control col-12 col-sm-7 col-md-7"
                    placeholder="Filtrar..." type="text" value={filter}
                    onChange={handleFilter}
                />
                <label className="table-labels-top float-end">{range()} {range() === 1 ? label : `${label}s`}</label>
            </div>
        </div>
    )
}

export default TableTop;
