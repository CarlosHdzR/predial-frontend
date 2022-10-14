import ReactPaginate from "react-paginate";
import { useTable } from "../../hooks";

function TableBottom({ pageNumber, firstItemShowedPerPage, lastItemShowedPerPage, changePage, pageCount }) {
    const { range } = useTable();

    return (
        <div className="dataTable-bottom">
            <div className="dataTable-info d-none d-sm-block mt-4">
                <span style={{ fontSize: "12px" }}>Mostrando {firstItemShowedPerPage + 1} a {
                    pageNumber + 1 === pageCount() ?
                        range()
                        :
                        lastItemShowedPerPage} de {range()
                    }
                </span>
            </div>
            <nav className="dataTable-pagination mt-3">
                <ul className="dataTable-pagination-list">
                    <ReactPaginate
                        breakLabel="..."
                        previousLabel={<i className="bi bi-caret-left-fill" />}
                        nextLabel={<i className="bi bi-caret-right-fill" />}
                        marginPagesDisplayed={0}
                        pageRangeDisplayed={5}
                        pageCount={pageCount()}
                        onPageChange={changePage}
                        activeClassName="active"
                    />
                </ul>
            </nav>
        </div>
    )
}

export default TableBottom;
