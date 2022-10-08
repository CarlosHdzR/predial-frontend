function InputSelect({ id, label, inputClass, labelClass, handleChange, ...inputProps }) {
    let array = []
    switch (id) {
        case "IdDown_payment":
            array = ["Sí", "No"]
            break;
        case "IdNumber_of_payments":
            array = [1, 2, 3, 4, 5, 6]
            break;
        case "IdId_type":
            array = ["CC", "CE", "Pasaporte"]
            break;
        default:
            break;
    }

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
                    <option defaultValue>Seleccionar</option>
                    {array.map((item, index) =>
                        <option key={index} value={item}>{item}</option>)
                    }
                </select>
            </div>
        </>
    )
}

export default InputSelect;
