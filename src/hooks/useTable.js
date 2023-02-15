import { useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { useAuthContext, usePropertiesContext, useUsersContext } from "../context";

export const useTable = () => {
    const { usersDb } = useUsersContext();
    const { payload } = useAuthContext();
    const { propertiesDb } = usePropertiesContext();
    const [searchParams, setSearchParams] = useSearchParams();
    const filter = searchParams.get("filter") ?? "";
    const [pageNumber, setPageNumber] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState({ select: 5 });
    const [sorting, setSorting] = useState({ field: "", order: "" });

    const { pathname } = useLocation();
    const isUser = pathname.includes("users");
    const users = usersDb.filter((user) => payload?.role === 1 ? user.role !== 1 : user.role === 3)
    let db = isUser ? users : propertiesDb;

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
        if (isUser) {
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
        filter,
        pageNumber,
        itemsPerPage,
        filterItems,
        db, isUser,
        setSorting,
        handleInputChange,
        handleFilter,
        pageCount,
        changePage,
        range
    }
}
