import { useState } from "react";
import { FormUser } from "../components/forms";
import { InputCheck } from "../components/inputs";
import { Link } from "react-router-dom";
import { Button } from "../components/minors";

function Register() {
    const [terms, setTerms] = useState(false);


    return (
        <div className="row justify-content-center">
            <div className="card col-11 col-sm-12 col-lg-10 py-3" id="rounded">
                <div className="card-body">
                    <h5 className="card-title text-center fs-4 pb-0">¡Regístrate!</h5>
                    <p className="small text-center pb-2">Ingresa tu información personal para crear tu cuenta</p>
                    <FormUser terms={terms}>
                        <InputCheck setTerms={setTerms} />
                        <Button label="Registrarse" />
                        <p className="small text-center mt-2 mb-0">
                            ¿Ya tienes una cuenta? <Link to="/login" className="ms-1">Inicia sesión aquí</Link>
                        </p>
                    </FormUser>
                </div>
            </div>
        </div>
    )
}

export default Register