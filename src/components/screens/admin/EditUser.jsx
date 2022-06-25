import { FormUser } from "../../forms"

function EditUser({ updateUser, userToEdit, setUserToEdit }) {
    return (
        <>
            <h5 className="card-title">Datos del usuario a editar</h5>
            <FormUser
                updateUser={updateUser}
                userToEdit={userToEdit}
                setUserToEdit={setUserToEdit}
            >
                <div className="col-5 col-sm-3 m-auto mt-3">
                    <button className="my-btn-success w-100" type="submit">
                        Editar
                    </button>
                </div>
            </FormUser>
        </>
    )
}

export default EditUser