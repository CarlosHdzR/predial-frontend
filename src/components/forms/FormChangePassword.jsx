import { InputPlaceholder } from '../inputs';
import { useFormUser } from '../../hooks';
import { config } from '../../config';
import { useAuthContext } from '../../context/AuthContext';

export const initialForm = {
    currentPassword: "",
    newPassword: "",
    renewPassword: ""
}

function FormChangePassword() {
    const { loggedUser } = useAuthContext();
    const { form, handleChange, handleSubmitChangePassword } = useFormUser({ initialForm });
    const { avatar, nombres, apellidos } = loggedUser || {};
    const { secure_url } = avatar || {};
    const { DEFAULT_AVATAR } = config.ASSETS;

    const inputChangePasswordProps = [
        {
            id: "IdCurrentPassword",
            name: "currentPassword",
            type: "password",
            className: "col-10 col-sm-8 col-md-7",
            icon: "fa-solid fa-key",
            placeholder: "Contraseña actual",
            required: true,
        },
        {
            id: "IdNewPassword",
            name: "newPassword",
            type: "password",
            className: "col-10 col-sm-8 col-md-7",
            icon: "fa-solid fa-key",
            errorMessage: "La contraseña debe tener una longitud mínima de 8; contener al menos 1 mayuscula, 1 minuscula, 1 número y un caracter especial!!!",
            placeholder: "Nueva contraseña",
            pattern: "^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])((?=.*\\W)|(?=.*_)).*$",
            required: true,
        },
        {
            id: "IdRenewPassword",
            name: "renewPassword",
            type: "password",
            className: "col-10 col-sm-8 col-md-7",
            icon: "fa-solid fa-key",
            errorMessage: "Las contraseñas no coinciden!!!",
            placeholder: "Confirmar contraseña",
            pattern: form.newPassword,
            required: true,
        },
    ];

    return (
        <>
            <div className="card-body profile-card">
                <img src={secure_url || DEFAULT_AVATAR} alt="avatar" className="img-fluid rounded-circle avatar" />
                <h2 className="text-center p-1">{nombres + " " + apellidos}</h2>
            </div>
            <div className="col-12 col-sm-10 mx-auto">
                <form className="row g-3" onSubmit={handleSubmitChangePassword} noValidate>
                    {inputChangePasswordProps.map((input) => (
                        <InputPlaceholder
                            key={input.id}
                            type={input.type}
                            {...input}
                            value={form[input.name]}
                            handleChange={handleChange}
                        />
                    ))}
                    <div className="text-center m-auto mt-2">
                        <button type="submit" className="my-btn-success">
                            Cambiar Contraseña
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default FormChangePassword;
