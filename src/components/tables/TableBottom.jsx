import ReactPaginate from "react-paginate";
import { useTable } from "../../hooks";

function TableBottom({ pageNumber, firstItemShowedPerPage, lastItemShowedPerPage, changePage, pageCount }) {
    const { range } = useTable();

    return (
        <div className="container d-sm-flex justify-content-between">
            <div className="d-none d-sm-block mt-4">
                <span className="table-labels-bottom">Mostrando {firstItemShowedPerPage + 1} a {
                    pageNumber + 1 === pageCount() ?
                        range()
                        :
                        lastItemShowedPerPage} de {range()
                    }
                </span>
            </div>
            <div className="mt-3 float-end">
                <ReactPaginate
                    containerClassName="pagination"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    activeClassName="active"
                    previousClassName="page-item fw-bold"
                    previousLinkClassName="page-link"
                    nextClassName="page-item fw-bold"
                    nextLinkClassName="page-link"
                    disabledClassName="page-item disabled"
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    breakLabel="..."
                    previousLabel="&laquo;"
                    nextLabel="&raquo;"
                    marginPagesDisplayed={0}
                    pageRangeDisplayed={3}
                    pageCount={pageCount()}
                    onPageChange={changePage}
                />
            </div>
        </div>
    )
}

export default TableBottom;
