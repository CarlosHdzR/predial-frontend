import PropertyInfo from './PropertyInfo';
import { useAuthContext } from '../../context/AuthContext';
import { UsersServices } from '../../services';
import { toastValidate } from '../../tools';
import { useLocation } from 'react-router-dom';
import Modal from './Modal';
import { FormAgreement } from '../forms';
import Button from './Button';

function PropertyDetails({ property }) {
    const { payload } = useAuthContext();
    const { associateProperty, payTax } = UsersServices();
    const { pathname } = useLocation();
    if (!property) return null;

    const handleAssociate = () => {
        if (payload.id_number !== property.owner_id_number) {
            toastValidate({ msg: "El predio no está asociado a tu número de documento!!!" })
            return false;
        }
        associateProperty(payload._id, property._id)
    }

    const handlePayTax = () => {
        payTax(property.code)
    }

    return (
        <div className="card" id="transparent">
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
                    <div className="row vh-center">
                        {property?.tax_paid
                            ?
                            <div className="vh-center">
                                <h5 className="outline-success mt-4">AL DÍA CON IMPUESTO PREDIAL</h5>
                            </div>
                            :
                            <>
                                <Button
                                    classDiv="col-6"
                                    label={`Pagar ${property.tax_value}`}
                                    onClick={handlePayTax}
                                />
                                <div className="col-6 text-center m-auto mt-3">
                                    <button
                                        className="my-btn-agreement"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                    >
                                        Solicitar convenio
                                    </button>
                                    <Modal>
                                        <FormAgreement property={property} />
                                    </Modal>
                                </div>
                            </>
                        }
                    </div>
                }
            </div>
        </div>
    )
}

export default PropertyDetails;
