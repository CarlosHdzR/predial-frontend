import { FormProperty } from "../components/forms"

function CreateProperty() {
    return (
        <>
            <h5 className="card-title">Ingrese los datos del predio</h5>
            <FormProperty>
                <div className="col-5 col-sm-3 col-md-3 m-auto mt-2">
                    <button className="my-btn-success w-100" type="submit">
                        Crear
                    </button>
                </div>
            </FormProperty>
        </>
    )
}

export default CreateProperty