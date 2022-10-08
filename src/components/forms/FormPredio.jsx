import { Input, InputDate } from "../inputs";
import { inputDateProps, inputPrediosProps } from "./";
import { useFormPredio } from "../../hooks";
import { useParams } from "react-router-dom";

export const initialForm = {
    _id: null,
    code: "",
    owner_name: "",
    owner_id_number: "",
    owner_email: "",
    built_area: "",
    total_area: "",
    property_value: "",
    tax_value: "",
    property_address: "",
    neighborhood: "",
    payment_date_1: "",
    payment_date_2: "",
    payment_date_3: "",
};

function FormPredio({ children }) {
    const { code } = useParams();
    const param = code;
    const { form, reset, handleChange, handleSubmit } = useFormPredio({ initialForm, param });

    try {
        form.tax_value = Math.round((form.property_value.replace(/[$.]/g, '')) * 0.01) || "";
    } catch (error) {
        console.log(error.message);
    }

    return (
        <form className="row g-3" onSubmit={handleSubmit} noValidate>
            {inputPrediosProps.map((input) => (
                <div key={input.id} className={input.className}>
                    <Input
                        key={input.id}
                        type={input.type}
                        {...input}
                        value={form[input.name]}
                        handleChange={handleChange}
                        reset={reset}
                    />
                </div>
            ))}
            <div>
                <hr className="mb-0" />
                <h5 className="card-title mb-0">
                    Fecha de Pago / Descuentos
                </h5>
            </div>
            {inputDateProps.map((input) => (
                <InputDate
                    key={input.id}
                    type={input.type}
                    {...input}
                    value={form[input.name]}
                    onChange={handleChange}
                    reset={reset}
                />
            ))}
            {children}
        </form>
    )
}

export default FormPredio;
