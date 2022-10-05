import PredioInfo from './PredioInfo';
import { useAuthContext } from '../../context/AuthContext';
import { UsersServices } from '../../services';
import { swalAlert } from '../../tools';
import { useLocation } from 'react-router-dom';
import Modal from './Modal';
import { FormConvenio } from '../forms';

function PredioDetails({ predio }) {
    const { payload } = useAuthContext();
    const { associatePredio } = UsersServices();
    const { pathname } = useLocation();
    if (!predio) return null;

    const handleAssociate = () => {
        associatePredio(payload._id, predio._id)
    }

    const showMsg = () => {
        swalAlert({
            msg: `<b>El pago correspondiente al predio con código <br/>
                <span class="text-danger">${predio.codigo}</span>, por un valor 
                de <span class="text-danger">$${predio.valor_predial}</span> 
                fue procesado exitosamente!!!</b>`,
            icon: 'success'
        })
    }

    let isAssociated = predio?.owner === payload._id;

    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Detalles del Predio</h5>
                <PredioInfo predio={predio} />
                {pathname.includes("asociar-predios")
                    ?
                    <div className="vh-center">
                        {isAssociated
                            ?
                            <h3 className="text-success fw-bold mt-4">Predio asociado a tu cuenta</h3>
                            :
                            <button
                                className="my-btn-success mt-4 mb-2"
                                onClick={handleAssociate}
                            >
                                Asociar predio
                            </button>
                        }
                    </div>
                    :
                    <div className="row">
                        <div className="col-6 vh-center mt-4 mb-2">
                            <button
                                className="my-btn-success m-auto"
                                onClick={showMsg}
                            >
                                Pagar ${predio.valor_predial}
                            </button>
                        </div>
                        <div className="col-6 vh-center mt-4 mb-2">
                            <button
                                className="my-btn-convenio m-auto"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                            >
                                Solicitar convenio
                            </button>
                            <Modal>
                                <FormConvenio predio={predio} />
                            </Modal>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default PredioDetails;
