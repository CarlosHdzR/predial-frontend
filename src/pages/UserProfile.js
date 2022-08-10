import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FormUser } from "../components/forms";
import { useUsersContext } from "../context/UsersContext";

function UserProfile() {
    const { userToEdit } = useUsersContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!userToEdit) {
            navigate("/admin/manage-users")
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userToEdit])

    return (
        <>
            <h5 className="card-title">Datos del usuario</h5>
            <FormUser />
        </>
    )
}

export default UserProfile;
