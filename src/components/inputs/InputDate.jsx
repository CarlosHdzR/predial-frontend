import { useEffect, useState } from "react";

const InputDate = ({ id, label, className, errorMessage,
    onChange, reset, ...inputProps }) => {
    const [focused, setFocused] = useState(false);

    const handleBlur = (e) => {
        setFocused(true);
    };

    useEffect(() => {
        setFocused(false);
    }, [reset])

    return (
        <>
            <label htmlFor={id} className="form-label blue-label col-10 col-sm-5 m-auto">
                {label}
            </label>
            <div className={`input-container m-auto my-3 ${className}`}>
                <input
                    {...inputProps}
                    id={id}
                    className="form-control text-center"
                    onChange={onChange}
                    onBlur={handleBlur}
                    focused={focused.toString()}
                />
                <span className="errorMsg col-12">
                    {errorMessage}
                </span>
            </div>
        </>
    );
};

export default InputDate;
