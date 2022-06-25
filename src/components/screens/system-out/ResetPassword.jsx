import { InputPlaceholder } from "../../inputs";
import { CrudUsers } from "../../../services"
import { useParams } from "react-router-dom";
import { useFormUser } from "../../../hooks";
import { validatePassword } from "../../../validations";

export const initialForm = {
    newPassword: "",
    renewPassword: ""
}

function ResetPassword() {
    const { form, showPassword, handleChange } = useFormUser({ initialForm })
    const { resetPassword } = CrudUsers()
    const { token } = useParams()

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validatePassword(form)) {
            resetPassword(form, token);
        }
    }

    const inputResetPasswordProps = [
        {
            id: "IdNewPassword",
            name: "newPassword",
            type: showPassword ? "text" : "password",
            className: "col-11 col-sm-8 col-md-9 col-lg-8 col-xl-7",
            icon: "fa-solid fa-key",
            errorMessage: "La contraseña debe tener una longitud mínima de 8; contener al menos 1 mayuscula, 1 minuscula, 1 número y un caracter especial!!!",
            placeholder: "Nueva contraseña",
            pattern: "^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])((?=.*\\W)|(?=.*_)).*$",
            required: true,
        },
        {
            id: "IdRenewPassword",
            name: "renewPassword",
            type: showPassword ? "text" : "password",
            className: "col-11 col-sm-8 col-md-9 col-lg-8 col-xl-7",
            icon: "fa-solid fa-key",
            errorMessage: "Las contraseñas no coinciden!!!",
            placeholder: "Confirmar contraseña",
            pattern: form.newPassword,
            required: true,
        },
    ];

    return (
        <div className="row justify-content-center">
            <div className="card col-11 col-sm-10 col-md-7 col-lg-6 py-3" id="rounded">
                <div className="card-body">
                    <div className="text-center">
                        <h5 className="card-title fs-4 pb-0">
                            ¿Olvidaste tu contraseña?
                        </h5>
                        <p className="small">
                            Ingresa tu nueva contraseña
                        </p>
                    </div>
                    <form className="row g-3 pt-2" onSubmit={handleSubmit} noValidate>
                        {inputResetPasswordProps.map((input) => (
                            <InputPlaceholder
                                key={input.id}
                                {...input}
                                value={form[input.name]}
                                handleChange={handleChange}
                            />
                        ))}
                        <div className="col-7 col-sm-6 m-auto mt-2">
                            <button type="submit" className="my-btn-success w-100">
                                Restablecer
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword