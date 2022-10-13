import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { usePropertiesContext } from "../context/PropertiesContext";
import { useUsersContext } from "../context/UsersContext";

export const useTable = (item) => {
    const { usersDb } = useUsersContext();
    const { payload } = useAuthContext();
    const [filteredUsersByRol, setFilteredUsersByRol] = useState([])
    const { propertiesDb } = usePropertiesContext();
    const [searchParams, setSearchParams] = useSearchParams();
    const filter = searchParams.get("filter") ?? "";
    const [pageNumber, setPageNumber] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState({ select: 5 });
    const [sorting, setSorting] = useState({ field: "", order: "" });

    useEffect(() => {
        setFilteredUsersByRol(usersDb.filter((user) => payload.role === 1 ? user.role !== 1 : user.role === 3));
    }, [payload.role, usersDb])

    let db = item === "user" ? filteredUsersByRol : propertiesDb;

    if (sorting.field) {
        const reversed = sorting.order === "asc" ? 1 : -1;
        db = db.sort((a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field]))
    };

    const handleInputChange = (event) => {
        setItemsPerPage({
            [event.target.name]: parseInt(event.target.value)
        })
    }

    const handleFilter = (e) => {
        setSearchParams({ filter: e.target.value })
    }

    const filterItems = db.filter((element) => {
        if (item === "user") {
            return (element.name + " " + element.surname).toLowerCase().includes(filter.toLowerCase()) ||
                element.id_number.toString().includes(filter.toLowerCase()) ||
                element.email.includes(filter.toLowerCase()) ||
                (element.role + " ").includes(filter.toLowerCase())
        } else {
            return element.code.toLowerCase().includes(filter.toLowerCase()) ||
                element.owner_name.toLowerCase().includes(filter.toLowerCase()) ||
                element.owner_id_number.toString().includes(filter.toLowerCase()) ||
                element.address.toLowerCase().includes(filter.toLowerCase())
        }
    })

    const pageCount = () => {
        if (!filter) return Math.ceil(db.length / itemsPerPage.select);
        return Math.ceil(filterItems.length / itemsPerPage.select);
    }

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    }

    const range = () => {
        if (!filter) return db.length;
        return filterItems.length
    }

    return {
        filteredUsersByRol,
        filter,
        pageNumber,
        itemsPerPage,
        filterItems,
        setSorting,
        handleInputChange,
        handleFilter,
        pageCount,
        changePage,
        range
    }
}
