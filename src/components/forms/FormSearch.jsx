import { useFormPredio } from '../../hooks/useFormPredio';

export const initialForm = { datos: "" };

function FormSearch({ title, text }) {
    const { form, handleChange, handleSubmitSearch } = useFormPredio({ initialForm });

    return (
        <div className="card col-11 col-md-10 col-lg-8 col-xl-6 m-auto mb-4 p-2" id="rounded">
            <div className="card-body">
                <h5 className="card-title">
                    Buscar predios
                </h5>
                <form onSubmit={handleSubmitSearch} className="row">
                    <div className="col-9 col-sm-4 m-sm-auto">
                        <label className="blue-label" htmlFor="idDatos">
                            Documento del propietario:
                        </label>
                    </div>
                    <div className="col-8 col-sm-6 m-auto">
                        <input className="form-control" type="text" name="datos"
                            id="idDatos" onChange={handleChange} value={form.datos}
                        />
                    </div>
                    <div className="col text-center m-auto">
                        <button className="my-btn-success" type="submit">
                            <i className="bi bi-search" />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default FormSearch;
