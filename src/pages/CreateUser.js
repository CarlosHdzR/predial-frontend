import { FormUser } from "../components/forms";
import { Button } from "../components/minors";

function CreateUser() {

    return (
        <>
            <h5 className="card-title">Ingrese los datos del usuario</h5>
            <FormUser>
                <Button label="Crear" />
            </FormUser>
        </>
    )
}

export default CreateUser;
