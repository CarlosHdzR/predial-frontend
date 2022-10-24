import { FormProperty } from "../components/forms"
import { Button } from "../components/minors"

function CreateProperty() {
    return (
        <>
            <h5 className="card-title">Ingrese los datos del predio</h5>
            <FormProperty>
                <Button label="Crear" />
            </FormProperty>
        </>
    )
}

export default CreateProperty