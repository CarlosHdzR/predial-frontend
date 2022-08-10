import { Link } from "react-router-dom";
import { InputPlaceholder } from "../components/inputs";
import { useFormUser } from "../hooks";

export const initialForm = {
    email: "",
    password: "",
}

function Login() {
    const { form, handleChange, handleSubmitLogin } = useFormUser({ initialForm })

    const inputLoginProps = [
        {
            id: "idUsuario",
            type: "text",
            className: "col-10",
            name: "email",
            placeholder: "Usuario",
            icon: "fa-user",
        },
        {
            id: "idPassword",
            type: "password",
            className: "col-10",
            name: "password",
            placeholder: "Contraseña",
            icon: "fa-key",
        },
    ]

    const linkProps = [
        {
            className: "my-2",
            label: "¿No tienes una cuenta?",
            path: "/register",
            labelLink: "Regístrate aquí!!!"
        },
        {
            label: "¿Olvidaste tu contraseña?",
            path: "/forgot-password",
            labelLink: "Recuperala aquí!!!"
        }
    ]

    return (
        <div className="row justify-content-center">
            <div className="card col-11 col-sm-10 col-md-8 col-lg-6 col-xl-5 py-3" id="rounded">
                <div className="card-body">
                    <div className="text-center">
                        <h5 className="card-title fs-4 pb-0">
                            ¡Bienvenido!
                        </h5>
                        <p className="small">
                            Ingresa tu usuario y contraseña para iniciar sesión
                        </p>
                    </div>
                    <form className="row g-3 pt-2" onSubmit={handleSubmitLogin} noValidate>
                        {inputLoginProps.map((input) => (
                            <InputPlaceholder
                                key={input.id}
                                value={form[input.name]}
                                {...input}
                                handleChange={handleChange} />
                        ))}
                        <div className="col-6 m-auto my-2">
                            <button className="my-btn-success w-100" type="submit">
                                Ingresar
                            </button>
                        </div>
                        {linkProps.map((link, index) => (
                            <div key={index} className={`text-center m-auto ${link.className}`}>
                                <p className="small mb-0">
                                    {link.label}
                                    <Link to={link.path} className="ms-1">
                                        {link.labelLink}
                                    </Link>
                                </p>
                            </div>
                        ))}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
