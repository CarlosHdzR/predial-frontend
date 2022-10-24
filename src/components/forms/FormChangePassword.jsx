import { InputPlaceholder } from '../inputs';
import { useFormUser } from '../../hooks';
import { config } from '../../config';
import { useAuthContext } from '../../context/AuthContext';
import { Button } from '../minors';

export const initialForm = {
    currentPassword: "",
    newPassword: "",
    renewPassword: ""
}

function FormChangePassword() {
    const { loggedUser } = useAuthContext();
    const { form, handleChange, handleSubmitChangePassword } = useFormUser({ initialForm });
    const { avatar, name, surname } = loggedUser || {};
    const { secure_url } = avatar || {};
    const { DEFAULT_AVATAR } = config.ASSETS;

    const inputChangePasswordProps = [
        {
            id: "IdCurrentPassword",
            name: "currentPassword",
            type: "password",
            inputClass: "col-10 col-sm-8 col-md-7 my-3",
            icon: "fa-solid fa-key",
            placeholder: "Contraseña actual",
            required: true,
        },
        {
            id: "IdNewPassword",
            name: "newPassword",
            type: "password",
            inputClass: "col-10 col-sm-8 col-md-7 my-3",
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
            inputClass: "col-10 col-sm-8 col-md-7 mt-3 mb-2",
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
                <h2 className="text-center p-1">{name + " " + surname}</h2>
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
                    <Button label="Cambiar"/>
                </form>
            </div>
        </>
    );
}

export default FormChangePassword;
