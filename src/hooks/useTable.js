import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export const useTable = (db, initialForm, item) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const filter = searchParams.get("filter") ?? "";
    const [pageNumber, setPageNumber] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(initialForm);
    const [sorting, setSorting] = useState({ field: "", order: "" });
    const firstItemShowedPerPage = pageNumber * itemsPerPage.select;
    const lastItemShowedPerPage = firstItemShowedPerPage + itemsPerPage.select;

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
        sorting,
        setSorting,
        firstItemShowedPerPage,
        lastItemShowedPerPage,
        handleInputChange,
        handleFilter,
        filterItems,
        pageCount,
        changePage,
        range
    }
}
