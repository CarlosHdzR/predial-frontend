import PredioInfo from './PredioInfo';
import { Modal } from '../minors';
import { FormConvenio } from '../forms';
import { swalAlert } from "../../tools";

function PagoDetails({ predio }) {
    if (!predio) return null;

    const showMsg = () => {
        swalAlert({
            msg: `<b>El pago correspondiente al predio con código <br/>
                <span class="text-danger">${predio.codigo}</span>, por un valor 
                de <span class="text-danger">$${predio.valor_predial}</span> 
                fue procesado exitosamente!!!</b>`,
            icon: 'success'
        })
    }

    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Detalles del Predio</h5>
                <PredioInfo predio={predio} />
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
            </div>
        </div>
    )
}

export default PagoDetails;
