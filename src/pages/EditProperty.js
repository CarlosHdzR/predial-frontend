import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FormProperty } from "../components/forms"
import { usePropertiesContext } from "../context/PropertiesContext";

function EditProperty() {
    const { propertyToEdit } = usePropertiesContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!propertyToEdit) {
            navigate("/admin/manage-properties");
        }
    }, [propertyToEdit, navigate])

    return (
        <>
            <h5 className="card-title">Datos del predio</h5>
            <FormProperty>
                <div className="col-5 col-sm-3 col-md-3 m-auto mt-2">
                    <button className="my-btn-success w-100" type="submit">
                        Editar
                    </button>
                </div>
            </FormProperty>
        </>
    )
}

export default EditProperty