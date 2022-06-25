import { Table, TableTop, TableBottom } from "../../tables";
import { useTable } from '../../../hooks';

export const initialForm = {
    select: 10
}

function ManageUsers({ users, loader, setUserToEdit, deleteUser }) {
    const {
        filter, pageNumber, itemsPerPage, sorting, setSorting,
        firstItemShowedPerPage, lastItemShowedPerPage,
        handleInputChange, handleFilter,
        filterItems, pageCount,
        changePage, range
    } = useTable(users, initialForm, "user")

    // Ordenar usuarios:
    if (sorting.field) {
        const reversed = sorting.order === "asc" ? 1 : -1;
        users = users.sort((a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field]))
    };

    return (
        <div className="row">
            <div className="col-lg-12">
                <h5 className="card-title">Usuarios Registrados</h5>
                <div className="fixed-columns">
                    <TableTop
                        data={users}
                        filter={filter}
                        itemsPerPage={itemsPerPage}
                        handleInputChange={handleInputChange}
                        handleFilter={handleFilter}
                        range={range}
                        label={["Usuario", "Usuarios"]}
                    />
                    <Table
                        data={users}
                        loader={loader}
                        setDataToEdit={setUserToEdit}
                        deleteData={deleteUser}
                        setSorting={setSorting}
                        firstItemShowedPerPage={firstItemShowedPerPage}
                        lastItemShowedPerPage={lastItemShowedPerPage}
                        filterItems={filterItems}
                        item="user"
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

export default ManageUsers