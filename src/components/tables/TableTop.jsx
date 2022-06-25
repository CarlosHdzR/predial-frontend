import { useRef } from "react";
import { getPayload } from "../../auth";
import { Tooltip } from "../minors";

function TableTop({ data, filter, itemsPerPage, handleInputChange, handleFilter, range, label }) {
    const payload = getPayload()
    const selectRef = useRef();

    return (
        <div className="dataTable-top mb-2">
            <div className="col-4">
                <select name="select" ref={selectRef} className="dataTable-selector text-center" value={itemsPerPage.select} onChange={handleInputChange}>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                    <option value="40">40</option>
                    <option value={data.length}>Todos</option>
                </select>
                <label style={{ fontSize: "12px", marginLeft: "5px" }}>{label[1]} por página</label>
            </div>
            <div className="col-7 col-md-5 col-lg-4">
                <Tooltip id="toolTipFilter" place="left">
                    Para filtrar por <em>rol</em> ingrese el valor seguido de un espacio
                </Tooltip>
                <input
                    data-tip
                    data-for={(payload.rol === 1 && label[0] === "Usuario") && "toolTipFilter"}
                    className="col-12 col-sm-7 col-md-7 col-lg-8 dataTable-input"
                    placeholder="Filtrar..." type="text" value={filter}
                    onChange={handleFilter}
                />
                <label style={{ fontSize: "12px", marginLeft: "5px" }}>{range()} {range() === 1 ? label[0] : label[1]}</label>
            </div>
        </div>
    )
}

export default TableTop