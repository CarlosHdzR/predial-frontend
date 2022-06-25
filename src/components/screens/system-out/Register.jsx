import { useState } from "react";
import { FormUser } from "../../forms";
import { InputCheck } from "../../inputs";
import { Link } from "react-router-dom";
import { CrudUsers } from "../../../services";

function Register() {
    const { registerUser } = CrudUsers()
    const [terms, setTerms] = useState(false);

    return (
        <div className="row justify-content-center">
            <div className="card col-11 col-sm-12 col-lg-10 py-3" id="rounded">
                <div className="card-body">
                    <h5 className="card-title text-center fs-4 pb-0">¡Regístrate!</h5>
                    <p className="small text-center pb-2">Ingresa tu información personal para crear tu cuenta</p>
                    <FormUser
                        registerUser={registerUser}
                        terms={terms}
                    >
                        <InputCheck setTerms={setTerms} />
                        <div className="col-7 col-sm-5 col-md-4 col-xl-3 m-auto my-2">
                            <button className="my-btn-success w-100" type="submit">
                                Regístrarse
                            </button>
                        </div>
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