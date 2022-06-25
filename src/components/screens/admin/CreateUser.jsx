import { FormUser } from '../../forms'

function CreateUser({ createUser, setUserToEdit }) {
    return (
        <>
            <h5 className="card-title">Ingrese los datos del usuario</h5>
            <FormUser
                createUser={createUser}
                setUserToEdit={setUserToEdit}
            >
                <div className="col-5 col-sm-3 m-auto mt-3">
                    <button className="my-btn-success w-100" type="submit">
                        Crear
                    </button>
                </div>
            </FormUser>
        </>
    )
}

export default CreateUser