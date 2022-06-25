import { useState } from 'react';
import { Input, InputSelect } from '../inputs';
import { inputConvenioProps } from './';
import { toastValidate, swalAlert } from '../../tools';

export const initialForm = {
    cuotaInicial: "",
    vrCuotaInicial: "",
    nroCuotas: "",
    vrCuotas: "",
}

function FormConvenio({ predio }) {
    const [form, setForm] = useState(initialForm)

    if (form.cuotaInicial === "No") {
        form.vrCuotaInicial = "0"
    }

    if (form.nroCuotas !== "Seleccionar") {
        form.vrCuotas = Math.ceil((predio.valor_predial - form.vrCuotaInicial.replace(/[$.]/g, '')) / form.nroCuotas)
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        })
    };

    const Msg = () => {
        if (form.cuotaInicial === "1") {
            if (!form.cuotaInicial || !form.vrCuotaInicial || !form.nroCuotas || !form.vrCuotas) {
                toastValidate({ msg: "Todos los campos son requeridos!!!" })
                return false
            }
        } else {
            if (!form.nroCuotas || !form.vrCuotas) {
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
            data: predio.codigo
        },
        {
            id: 2,
            label: "Propietario",
            data: predio.nom_prop
        },
        {
            id: 3,
            label: "Valor del Predio",
            data: predio.valor_predio
        },
        {
            id: 4,
            label: "Valor a pagar",
            data: predio.valor_predial
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
