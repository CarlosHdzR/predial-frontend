import { useState } from 'react';
import { useAuthContext } from '../../context/AuthContext';

function TableHeaders({ headerProps, onSorting }) {
    const [sortingField, setSortingField] = useState("");
    const [sortingOrder, setSortingOrder] = useState("asc");
    const { payload } = useAuthContext();

    const onSortingChange = field => {
        const order = field === sortingField && sortingOrder === "asc" ? "desc" : "asc";
        setSortingField(field);
        setSortingOrder(order);
        onSorting(field, order);
    };

    const isRole2 = payload.role === 2;
    const filteredHeaderProps = headerProps.filter((prop) => isRole2 ? prop.name !== "Rol" : prop)

    return (
        <thead>
            <tr>
                {filteredHeaderProps.map(({ name, field, sortable, className, dataFor }) => (
                    <th
                        data-tip data-for={dataFor}
                        className={className}
                        key={name}
                        onClick={() => sortable ? onSortingChange(field) : null}
                    >
                        {name}
                        {sortingField && sortingField === field && (
                            sortingOrder === "asc"
                                ? <i className="bi bi-caret-down-fill" />
                                : <i className="bi bi-caret-up-fill" />
                        )
                        }
                    </th>
                ))}
            </tr>
        </thead>
    )
}

export default TableHeaders;
