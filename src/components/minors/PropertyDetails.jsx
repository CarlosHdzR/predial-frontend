import PropertyInfo from './PropertyInfo';
import { useAuthContext } from '../../context/AuthContext';
import { UsersServices } from '../../services';
import { swalAlert } from '../../tools';
import { useLocation } from 'react-router-dom';
import Modal from './Modal';
import { FormAgreement } from '../forms';
import { useUsersContext } from '../../context/UsersContext';
import ButtonSpinner from './ButtonSpinner';

function PropertyDetails({ property }) {
    const { payload } = useAuthContext();
    const { associateProperty } = UsersServices();
    const { isSending } = useUsersContext();
    const { pathname } = useLocation();
    if (!property) return null;

    const handleAssociate = () => {
        associateProperty(payload._id, property._id)
    }

    const showMsg = () => {
        swalAlert({
            msg: `<b>El pago correspondiente al predio con código <br/>
                <span class="text-danger">${property.code}</span>, por un valor 
                de <span class="text-danger">$${property.tax_value}</span> 
                fue procesado exitosamente!!!</b>`,
            icon: 'success'
        })
    }

    let isAssociated = property?.owner === payload._id;

    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Detalles del Predio</h5>
                <PropertyInfo property={property} />
                {pathname.includes("associate-properties")
                    ?
                    <div className="vh-center">
                        {isAssociated
                            ?
                            <h3 className="text-success fw-bold mt-4">Predio asociado a tu cuenta</h3>
                            :
                            <button
                                className="my-btn-success mt-4 mb-2 px-5"
                                onClick={handleAssociate}
                            >
                                Asociar predio {isSending && <ButtonSpinner />}
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
                                Pagar ${property.tax_value}
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
                                <FormAgreement property={property} />
                            </Modal>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default PropertyDetails;
