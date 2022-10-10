import { Input, InputDate } from "../inputs";
import { inputDateProps, inputPropertiesProps } from "./consts";
import { useFormProperty } from "../../hooks";
import { useParams } from "react-router-dom";

export const initialForm = {
    _id: null,
    code: "",
    owner_name: "",
    owner_id_number: "",
    owner_email: "",
    built_area: "",
    total_area: "",
    value: "",
    tax_value: "",
    address: "",
    neighborhood: "",
    payment_date_1: "",
    payment_date_2: "",
    payment_date_3: "",
};

function FormProperty({ children }) {
    const { code } = useParams();
    const param = code;
    const { form, reset, handleChange, handleSubmit } = useFormProperty({ initialForm, param });

    try {
        form.tax_value = Math.round((form.value.replace(/[$.]/g, '')) * 0.01) || "";
    } catch (error) {
        console.log(error.message);
    }

    return (
        <form className="row g-3" onSubmit={handleSubmit} noValidate>
            {inputPropertiesProps.map((input) => (
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

export default FormProperty;