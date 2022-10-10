import { useEffect, useState } from 'react';
import { usePropertiesContext } from '../context/PropertiesContext';
import { PropertiesServices } from '../services';
import { toastValidate } from '../tools';
import { validateProperty } from '../validations';

export const useFormProperty = ({ initialForm, param }) => {
    const [form, setForm] = useState(initialForm);
    const [reset, setReset] = useState(false);
    const { propertiesDb, propertyToEdit, setPropertyToEdit, setSearchProperties } = usePropertiesContext();
    const { createProperty, updateProperty } = PropertiesServices();

    useEffect(() => {
        try {
            if (param) { // Validar si va a crear o editar
                setForm(propertyToEdit._id && propertyToEdit);
            } else {
                setForm(initialForm);
            }
        } catch (error) {
            setForm(initialForm);
        }
    }, [param, propertyToEdit, initialForm]);

    const calculatePredial = () => {
        const predial = Math.round((form.value.replace(/[$.]/g, '')) * 0.01) || "";
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
        setPropertyToEdit(null);
        setReset(!reset);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateProperty({ form, propertiesDb, propertyToEdit })) {
            if (form._id === null) {
                form._id = undefined
                createProperty(form);
                handleReset();
            } else {
                let _id = propertyToEdit._id
                updateProperty(form, _id);
            }
        }
    };

    const handleSubmitSearch = (e) => {
        e.preventDefault();
        if (!form.datos) {
            toastValidate({ msg: "Por favor, ingrese los datos solicitados!!!", position: "bottom-center" });
            return;
        }
        setSearchProperties(form);
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
