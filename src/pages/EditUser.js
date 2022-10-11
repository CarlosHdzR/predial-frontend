import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FormUser } from "../components/forms";
import { useUsersContext } from "../context/UsersContext";

function EditUser() {
    const { userToEdit } = useUsersContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!userToEdit) {
            navigate("/admin/manage-users")
        }
    }, [userToEdit, navigate])

    return (
        <>
            <h5 className="card-title">Datos del usuario</h5>
            <FormUser>
                <div className="col-5 col-sm-3 m-auto mt-3">
                    <button
                        className="my-btn-success w-100"
                        type="submit">
                        Editar
                    </button>
                </div>
            </FormUser>
        </>
    )
}

export default EditUser;
