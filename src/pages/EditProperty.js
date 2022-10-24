import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FormProperty } from "../components/forms"
import { Button } from "../components/minors";
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
                <Button label="Editar"/>
            </FormProperty>
        </>
    )
}

export default EditProperty