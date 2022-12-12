import { Input, InputDate } from "../inputs";
import { inputDateProps, inputPropertiesProps } from "./consts";
import { useFormProperty } from "../../hooks";
import { useParams } from "react-router-dom";
import { formatDate } from "../../tools";

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
    payment_date_1: formatDate(12), // Pago máximo: 1 año luego de la creación del predio
    payment_date_2: formatDate(3), // Pago Dcto 40%: 3 meses luego de la creación del predio
    payment_date_3: formatDate(6), // Pago Dcto 20%: 6 meses luego de la creación del predio
};

function FormProperty({ children }) {
    const { code } = useParams();
    const param = code;
    const { form, reset, handleChange, handleSubmit } = useFormProperty({ initialForm, param });

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
                    value={form[input.name]} // TODO: Setear fechas predeterminadas
                    onChange={handleChange}
                    reset={reset}
                />
            ))}
            {children}
        </form>
    )
}

export default FormProperty;
