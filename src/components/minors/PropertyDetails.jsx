import PropertyInfo from './PropertyInfo';
import { useAuthContext } from '../../context/AuthContext';
import { UsersServices } from '../../services';
import { swalAlert, toastValidate } from '../../tools';
import { useLocation } from 'react-router-dom';
import Modal from './Modal';
import { FormAgreement } from '../forms';
import Button from './Button';

function PropertyDetails({ property }) {
    const { payload } = useAuthContext();
    const { associateProperty } = UsersServices();
    const { pathname } = useLocation();
    if (!property) return null;

    const handleAssociate = () => {
        if (payload.id_number !== property.owner_id_number) {
            toastValidate({msg: "El predio no está asociado a tu número de documento!!!"})
            return false;
        }
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

    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Detalles del Predio</h5>
                <PropertyInfo property={property} />
                {pathname.includes("associate-properties")
                    ?
                    <div className="vh-center">
                        {property?.owner
                            ?
                            <h5 className="outline-success mt-4">PREDIO ASOCIADO</h5>
                            :
                            <Button label="Asociar" onClick={handleAssociate} />
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
                                className="my-btn-agreement m-auto"
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
