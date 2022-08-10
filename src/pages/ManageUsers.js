import { useTable } from "../hooks";
import { Table, TableTop, TableBottom } from "../components/tables";

function ManageUsers() {
    const {
        pageNumber,
        itemsPerPage,
        handleInputChange,
        pageCount,
        changePage,
    } = useTable("user");

    const firstItemShowedPerPage = pageNumber * itemsPerPage.select;
    const lastItemShowedPerPage = firstItemShowedPerPage + itemsPerPage.select;

    return (
        <div className="row">
            <div className="col-lg-12">
                <h5 className="card-title">Usuarios Registrados</h5>
                <div className="fixed-columns">
                    <TableTop
                        itemsPerPage={itemsPerPage}
                        handleInputChange={handleInputChange}
                        label={["Usuario", "Usuarios"]}
                        item="user"
                    />
                    <Table
                        firstItemShowedPerPage={firstItemShowedPerPage}
                        lastItemShowedPerPage={lastItemShowedPerPage}
                        item="user"
                    />
                    <TableBottom
                        pageNumber={pageNumber}
                        firstItemShowedPerPage={firstItemShowedPerPage}
                        lastItemShowedPerPage={lastItemShowedPerPage}
                        pageCount={pageCount}
                        changePage={changePage}
                        item="user"
                    />
                </div>
            </div>
        </div>
    )
}

export default ManageUsers;
