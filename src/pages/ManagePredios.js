import { useTable } from "../hooks";
import { Table, TableTop, TableBottom } from "../components/tables";

function ManagePredios() {
    const {
        pageNumber,
        itemsPerPage,
        handleInputChange,
        pageCount,
        changePage,
    } = useTable("predio");

    const firstItemShowedPerPage = pageNumber * itemsPerPage.select;
    const lastItemShowedPerPage = firstItemShowedPerPage + itemsPerPage.select;

    return (
        <div className="row">
            <div className="col-lg-12">
                <h5 className="card-title">Predios Registrados</h5>
                <div className="fixed-columns">
                    <TableTop
                        itemsPerPage={itemsPerPage}
                        handleInputChange={handleInputChange}
                        label={["Predio", "Predios"]}
                        item="predio"
                    />
                    <Table
                        firstItemShowedPerPage={firstItemShowedPerPage}
                        lastItemShowedPerPage={lastItemShowedPerPage}
                        item="predio"
                    />
                    <TableBottom
                        pageNumber={pageNumber}
                        firstItemShowedPerPage={firstItemShowedPerPage}
                        lastItemShowedPerPage={lastItemShowedPerPage}
                        pageCount={pageCount}
                        changePage={changePage}
                        item="predio"
                    />
                </div>
            </div>
        </div>
    )
}

export default ManagePredios;
