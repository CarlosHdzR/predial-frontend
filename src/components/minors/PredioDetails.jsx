import PredioInfo from './PredioInfo';
import { swalAlert } from "../../tools";
import { useAuthContext } from '../../context/AuthContext';

function PredioDetails({ predio }) {
    const { payload } = useAuthContext();
    if (!predio) return null;

    const showMsg = () => {
        if (predio.doc_prop === payload.nro_doc) {
            swalAlert({
                msg: `<b>El predio con código <span class="text-danger">${predio.codigo}</span> fue asociado 
                    a su cuenta exitosamente!!!</b>`,
                icon: 'success'
            })
        } else {
            swalAlert({
                msg: `<b>Su número de documento no coincide con el del propietario del predio!!!</b>`,
                icon: 'error'
            })
        }
    }

    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Detalles del Predio</h5>
                <PredioInfo predio={predio} />
                <div className="vh-center">
                    <button
                        className="my-btn-success mt-4 mb-2"
                        onClick={showMsg}
                    >
                        Asociar predio
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PredioDetails;
