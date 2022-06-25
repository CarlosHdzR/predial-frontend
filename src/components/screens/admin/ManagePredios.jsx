import { Table, TableTop, TableBottom } from "../../tables";
import { useTable } from "../../../hooks";

export const initialForm = {
    select: 10
}

function ManagePredios({ predios, loader, setPredioToEdit, deletePredio }) {
    const {
        filter, pageNumber, itemsPerPage, sorting, setSorting,
        firstItemShowedPerPage, lastItemShowedPerPage,
        handleInputChange, handleFilter,
        filterItems, pageCount,
        changePage, range
    } = useTable(predios, initialForm, "predio")

    // Ordenar predios:
    if (sorting.field) {
        const reversed = sorting.order === "asc" ? 1 : -1;
        predios = predios.sort((a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field]))
    };

    return (
        <div className="row">
            <div className="col-lg-12">
                <h5 className="card-title">Predios Registrados</h5>
                <div className="fixed-columns">
                    <TableTop
                        data={predios}
                        filter={filter}
                        itemsPerPage={itemsPerPage}
                        handleInputChange={handleInputChange}
                        handleFilter={handleFilter}
                        range={range}
                        label={["Predio", "Predios"]}
                    />
                    <Table
                        data={predios}
                        loader={loader}
                        setDataToEdit={setPredioToEdit}
                        deleteData={deletePredio}
                        setSorting={setSorting}
                        firstItemShowedPerPage={firstItemShowedPerPage}
                        lastItemShowedPerPage={lastItemShowedPerPage}
                        filterItems={filterItems}
                        item="predio"
                    />
                    <TableBottom
                        pageNumber={pageNumber}
                        firstItemShowedPerPage={firstItemShowedPerPage}
                        lastItemShowedPerPage={lastItemShowedPerPage}
                        pageCount={pageCount}
                        changePage={changePage}
                        range={range}
                    />
                </div>
            </div>
        </div>
    )
}

export default ManagePredios