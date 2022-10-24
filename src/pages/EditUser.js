import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FormUser } from "../components/forms";
import { Button } from "../components/minors";
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
                <Button label="Editar"/>
            </FormUser>
        </>
    )
}

export default EditUser;
