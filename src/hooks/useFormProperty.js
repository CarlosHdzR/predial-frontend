import { useEffect, useState } from 'react';
import { usePrediosContext } from '../context/PropertiesContext';
import { PropertiesServices } from '../services';
import { toastValidate } from '../tools';
import { validateProperty } from '../validations';

export const useFormProperty = ({ initialForm, param }) => {
    const [form, setForm] = useState(initialForm);
    const [reset, setReset] = useState(false);
    const { prediosDb, predioToEdit, setPredioToEdit, setSearchPredios } = usePrediosContext();
    const { createPredio, updatePredio } = PropertiesServices();

    useEffect(() => {
        try {
            if (param) { // Validar si va a crear o editar
                setForm(predioToEdit._id && predioToEdit);
            } else {
                setForm(initialForm);
            }
        } catch (error) {
            setForm(initialForm);
        }
    }, [param, predioToEdit, initialForm]);

    const calculatePredial = () => {
        const predial = Math.round((form.property_value.replace(/[$.]/g, '')) * 0.01) || "";
        return predial;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        })
    };

    const handleReset = () => {
        setForm(initialForm);
        setPredioToEdit(null);
        setReset(!reset);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateProperty({ form, prediosDb, predioToEdit })) {
            if (form._id === null) {
                form._id = undefined
                createPredio(form);
                handleReset();
            } else {
                let _id = predioToEdit._id
                updatePredio(form, _id);
            }
        }
    };

    const handleSubmitSearch = (e) => {
        e.preventDefault();
        if (!form.datos) {
            toastValidate({ msg: "Por favor, ingrese los datos solicitados!!!", position: "bottom-center" });
            return;
        }
        setSearchPredios(form);
        setForm({ datos: "" });
    };

    return {
        form, setForm,
        reset,
        handleChange,
        handleSubmit,
        handleSubmitSearch,
        calculatePredial
    }
}
