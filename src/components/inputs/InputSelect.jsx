function InputSelect({ id, label, inputClass, labelClass, handleChange, ...inputProps }) {
    const SELECTS = {
        IdDown_payment: ["Sí", "No"],
        IdNumber_of_payments: [1, 2, 3, 4, 5, 6],
        IdId_type: ["CC", "CE", "Pasaporte"]
    }
    const selectValues = SELECTS[id] ?? [];

    return (
        <>
            <label htmlFor={id} className={`form-label blue-label ${labelClass}`}>
                {label}
            </label>
            <div className={`input-container ${inputClass}`}>
                <select
                    {...inputProps}
                    id={id}
                    className="form-select"
                    onChange={handleChange}
                >
                    <option defaultValue value={""}>Seleccionar</option>
                    {selectValues.map((item, index) =>
                        <option key={index} value={item}>{item}</option>)
                    }
                </select>
            </div>
        </>
    )
}

export default InputSelect;
