import { useEffect, useState } from "react";
import MaskedInput from 'react-text-mask'
import { useAuthContext } from "../../context/AuthContext";

const Input = ({ id, type, inputClass, labelClass, icon, errorMessage,
    label, handleChange, reset, mask, ...inputProps }) => {
    const [focused, setFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { payload, auth } = useAuthContext();
    const role = payload?.role;
    const isAdmin = auth && role === 1;

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
        <>
            <label htmlFor={id} className={`form-label blue-label ${labelClass}`}>
                {label}
            </label>
            <div className={`input-container ${inputClass}`}>
                <i className={`${icon} input-icon`} id="admin" />
                {!mask
                    ?
                    <input
                        {...inputProps}
                        id={id}
                        type={(type === "password" && showPassword) ? "text" : type}
                        className={`form-control ${!isAdmin ? "form-transparent" : ""}`}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        focused={focused.toString()}
                    />
                    :
                    <MaskedInput
                        mask={mask}
                        guide={false}
                        {...inputProps}
                        id={id}
                        className={`form-control ${!isAdmin ? "form-transparent" : ""}`}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        focused={focused.toString()}
                    />
                }
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
        </>
    );
};

export default Input;
