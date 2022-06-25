import React from 'react'

function InputSelect({ id, label, inputClass, labelClass, handleChange, ...inputProps }) {
    let array = []
    switch (id) {
        case "IdCuotaInicial":
            array = ["Sí", "No"]
            break;
        case "IdNroCuotas":
            array = [1, 2, 3, 4, 5, 6]
            break;
        case "IdTipo_doc":
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

export default InputSelect