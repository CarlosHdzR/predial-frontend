import { useEffect, useState } from 'react';
import { GetData } from '../services';
import { validatePredio } from '../validations';

export const useFormPredio = ({ initialForm, createPredio, updatePredio, predioToEdit, setPredioToEdit }) => {
    const [form, setForm] = useState(initialForm);
    const [reset, setReset] = useState(false)
    const { prediosDb } = GetData()

    useEffect(() => {
        if (predioToEdit) {
            setForm(predioToEdit);
        } else {
            setForm(initialForm);
        }
    }, [predioToEdit, initialForm]);

    form.valor_predial = Math.round((form.valor_predio.replace(/[$.]/g, '')) * 0.01) || "";

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        })
    };

    const handleReset = (e) => {
        setForm(initialForm);
        setPredioToEdit(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validatePredio({ form, prediosDb, predioToEdit })) {
            if (form._id === null) {
                form._id = undefined
                createPredio(form);
                handleReset();
                setReset(!reset)
            } else {
                let _id = predioToEdit._id
                updatePredio(form, _id);
            }
        }
    };

    return {
        form,
        reset,
        handleChange,
        handleSubmit
    }
}