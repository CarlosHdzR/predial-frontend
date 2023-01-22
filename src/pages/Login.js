import { useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { InputPlaceholder } from "../components/inputs";
import { Button } from "../components/minors";
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
            inputClass: "col-10 my-3",
            name: "email",
            placeholder: "Usuario",
            icon: "fa-user",
        },
        {
            id: "idPassword",
            type: "password",
            inputClass: "col-10 mt-3 mb-2",
            name: "password",
            placeholder: "Contraseña",
            icon: "fa-key",
        },
    ]

    const linkProps = [
        {
            linkClass: "mt-3 mb-2",
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

    useEffect(() => {
        Swal.fire({
            position: 'bottom-end',
            title: '<strong style="color: #0b295e">Credenciales de Administrador</strong>',
            html:
                '<b>Usuario: </b><span>admin@gmail.com</span><br/>' +
                '<b>Contraseña: </b><span>Admin_1234</span><br/>',
            confirmButtonText:
                '<i class="fa fa-thumbs-up"></i> OK',
            confirmButtonColor: '#0b295e',
        })
    }, [])

    return (
        <div className="row justify-content-center">
            <div className="card card-lp col-11 col-sm-10 col-md-8 col-lg-6 col-xl-5 py-3" id="rounded">
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
                        <Button label="Ingresar" />
                        {linkProps.map((link, index) => (
                            <div key={index} className={`text-center m-auto ${link.linkClass}`}>
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
