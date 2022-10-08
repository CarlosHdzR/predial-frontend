import { useState } from 'react';
import { Input, InputSelect } from '../inputs';
import { inputConvenioProps } from './';
import { toastValidate, swalAlert } from '../../tools';

export const initialForm = {
    down_payment: "",
    down_payment_value: "",
    number_of_payments: "",
    payments_value: "",
}

function FormConvenio({ predio }) {
    const [form, setForm] = useState(initialForm);

    if (form.down_payment === "No") {
        form.down_payment_value = "0"
    }

    if (form.number_of_payments !== "Seleccionar") {
        form.payments_value = Math.ceil((predio.tax_value - form.down_payment_value.replace(/[$.]/g, '')) / form.number_of_payments)
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        })
    };

    const Msg = () => {
        if (form.down_payment === "1") {
            if (!form.down_payment || !form.down_payment_value || !form.number_of_payments || !form.payments_value) {
                toastValidate({ msg: "Todos los campos son requeridos!!!" })
                return false
            }
        } else {
            if (!form.number_of_payments || !form.payments_value) {
                toastValidate({ msg: "Todos los campos son requeridos!!!" })
                return false
            }
        }
        swalAlert({
            msg: `<b>Su solicitud fue recibida satisfactoriamente y será respondida dentro 
                de un plazo de <span class="text-danger">3 a 5 días hábiles</span>!!!</b>`,
            icon: 'success'
        })
        setForm(initialForm)
    }

    const dataPredio = [
        {
            id: 1,
            label: "Código del Predio",
            data: predio.code
        },
        {
            id: 2,
            label: "Propietario",
            data: predio.owner_name
        },
        {
            id: 3,
            label: "Valor del Predio",
            data: predio.property_value
        },
        {
            id: 4,
            label: "Valor a pagar",
            data: predio.tax_value
        }
    ]

    return (
        <>
            <div className="row text-center">
                <h5 className="card-title">Solicitar Convenio de Pago</h5>
                {dataPredio.map((item) => (
                    <div key={item.id} className="col-6 pb-3">
                        <div className="blue-label">
                            {item.label}:
                        </div>
                        <div className="fw-bold">
                            {item.data}
                        </div>
                    </div>
                ))}
            </div>
            <form className="row g-3 mt-1" noValidate>
                {inputConvenioProps.map((input) => (
                    input.type === "select" ?
                        <InputSelect
                            key={input.id}
                            type={input.type}
                            {...input}
                            value={form[input.name]}
                            handleChange={handleChange}
                        />
                        :
                        <Input
                            key={input.id}
                            type={input.type}
                            {...input}
                            value={form[input.name]}
                            handleChange={handleChange}
                        />
                ))}
                <div className="col-5 col-lg-4 m-auto mt-2">
                    <button
                        className="my-btn-success w-100"
                        type="button"
                        onClick={Msg}
                    >
                        Solicitar
                    </button>
                </div>
            </form>
        </>
    )
};

export default FormConvenio;
