import { FormPredio } from "../../forms"

function EditPredio({ updatePredio, predioToEdit, setPredioToEdit }) {
    return (
        <>
            <h5 className="card-title">Datos del predio a editar</h5>
            <FormPredio
                updatePredio={updatePredio}
                predioToEdit={predioToEdit}
                setPredioToEdit={setPredioToEdit}
            >
                <div className="col-5 col-sm-3 col-md-3 m-auto mt-2">
                    <button className="my-btn-success w-100" type="submit">
                        Editar
                    </button>
                </div>
            </FormPredio>
        </>
    )
}

export default EditPredio