import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";

function InputSelect({ id, label, inputClass, labelClass,
    errorMessage, handleChange, reset, ...inputProps }) {
    const [focused, setFocused] = useState(false);
    const { payload, auth } = useAuthContext();
    const role = payload?.role;
    const isAdmin = auth && role === 1;

    const SELECTS = {
        IdDown_payment: ["Sí", "No"],
        IdNumber_of_payments: [1, 2, 3, 4, 5, 6],
        IdId_type: ["CC", "CE", "Pasaporte"]
    }
    const selectValues = SELECTS[id] ?? [];

    const handleBlur = () => {
        setFocused(true);
    };

    useEffect(() => {
        setFocused(false);
    }, [reset])

    return (
        <>
            <label htmlFor={id} className={`form-label blue-label ${labelClass}`}>
                {label}
            </label>
            <div className={`input-container ${inputClass}`}>
                <select
                    {...inputProps}
                    id={id}
                    className={`form-select ${!isAdmin ? "form-transparent" : ""}`}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    focused={focused.toString()}
                >
                    <option defaultValue value={""}>Seleccionar</option>
                    {selectValues.map((item, index) =>
                        <option key={index} value={item}>{item}</option>)
                    }
                </select>
                <span className="errorMsg col-12">
                    {errorMessage}
                </span>
            </div>
        </>
    )
}

export default InputSelect;
