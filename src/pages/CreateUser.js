import { FormUser } from "../components/forms";
import { ButtonSpinner } from "../components/minors";
import { useUsersContext } from "../context/UsersContext";

function CreateUser() {
    const { isSending } = useUsersContext();
    
    return (
        <>
            <h5 className="card-title">Ingrese los datos del usuario</h5>
            <FormUser>
                <div className="col-5 col-sm-3 m-auto mt-3">
                    <button className="my-btn-success w-100" type="submit">
                        Crear {isSending && <ButtonSpinner/>}
                    </button>
                </div>
            </FormUser>
        </>
    )
}

export default CreateUser;
