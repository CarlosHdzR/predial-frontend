import { useEffect, useState } from 'react'

function InputPlaceholder({ className, type, icon, errorMessage, handleChange, reset, ...inputProps }) {
    const [focused, setFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleBlur = () => {
        setFocused(true);
    };

    const handleShow = () => {
        setShowPassword(!showPassword)
    }

    useEffect(() => {
        setFocused(false);
    }, [reset])

    return (
        <div className={`input-container m-auto my-3 ${className}`}>
            <i className={`fa-solid ${icon} input-icon`} />
            <input
                {...inputProps}
                className="form-control"
                type={(type === "password" && showPassword) ? "text" : type}
                onChange={handleChange}
                onBlur={handleBlur}
                focused={focused.toString()}
            />
            {type === "password" &&
                <span
                    onClick={handleShow}>
                    <i className={showPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"} />
                </span>
            }
            <span className="errorMsg col-12">
                {errorMessage}
            </span>
        </div>
    )
}

export default InputPlaceholder;
