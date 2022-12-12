import { useEffect, useState } from 'react';
import { usePropertiesContext } from '../context/PropertiesContext';
import { PropertiesServices } from '../services';
import { calculateTax } from '../tools/calculateTax';
import { validateProperty, validateOwnerIdProperty } from '../validations';

export const useFormProperty = ({ initialForm, param }) => {
    const [form, setForm] = useState(initialForm);
    const [reset, setReset] = useState(false);
    const { propertiesDb, propertyToEdit, setPropertyToEdit, setSearchProperties } = usePropertiesContext();
    const { createProperty, updateProperty } = PropertiesServices();
    form.value = form?.value?.replace(/[$]/, "");
    form.tax_value = form.value && calculateTax(form?.value).replace(/[,]/g, '.');
    form.tax_value = form.tax_value === "0" ? "" : form.tax_value;

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
        if (validateOwnerIdProperty(form)) {
            setSearchProperties(form);
            setForm({ owner_id_number: "" });
        }
    };

    return {
        form, setForm,
        reset,
        handleChange,
        handleSubmit,
        handleSubmitSearch,
    }
}
