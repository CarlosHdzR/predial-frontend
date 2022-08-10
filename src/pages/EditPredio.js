import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FormPredio } from "../components/forms"
import { usePrediosContext } from "../context/PrediosContext";

function EditPredio() {
    const { predioToEdit } = usePrediosContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!predioToEdit) {
            navigate("/admin/manage-predios");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [predioToEdit])

    return (
        <>
            <h5 className="card-title">Datos del predio</h5>
            <FormPredio>
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