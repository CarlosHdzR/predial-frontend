import { FormPredio } from "../../forms"

function CreatePredio({ createPredio, setPredioToEdit }) {
    return (
        <>
            <h5 className="card-title">Ingrese los datos del predio</h5>
            <FormPredio
                createPredio={createPredio}
                setPredioToEdit={setPredioToEdit}
            >
                <div className="col-5 col-sm-3 col-md-3 m-auto mt-2">
                    <button className="my-btn-success w-100" type="submit">
                        Crear
                    </button>
                </div>
            </FormPredio>
        </>
    )
}

export default CreatePredio