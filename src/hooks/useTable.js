import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { usePrediosContext } from "../context/PrediosContext";
import { useUsersContext } from "../context/UsersContext";
import { useAuthContext } from "../context/AuthContext";

export const useTable = (item) => {
    const { usersDb } = useUsersContext();
    const { payload } = useAuthContext();
    const { prediosDb } = usePrediosContext();
    const [searchParams, setSearchParams] = useSearchParams();
    const filter = searchParams.get("filter") ?? "";
    const [pageNumber, setPageNumber] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState({ select: 5 });
    const [sorting, setSorting] = useState({ field: "", order: "" });

    let users = (payload.rol === 1) ?
        usersDb.filter((user) => user.rol !== 1) :
        usersDb.filter((user) => user.rol === 3);

    let db = item === "user" ? users : prediosDb;

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
            return (element.nombres + " " + element.apellidos).toLowerCase().includes(filter.toLowerCase()) ||
                element.nro_doc.toString().includes(filter.toLowerCase()) ||
                element.email.includes(filter.toLowerCase()) ||
                (element.rol + " ").includes(filter.toLowerCase())
        } else {
            return element.codigo.toLowerCase().includes(filter.toLowerCase()) ||
                element.nom_prop.toLowerCase().includes(filter.toLowerCase()) ||
                element.doc_prop.toString().includes(filter.toLowerCase()) ||
                element.direccion_predio.toLowerCase().includes(filter.toLowerCase())
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
        setSorting,
        handleInputChange,
        handleFilter,
        pageCount,
        changePage,
        range
    }
}
