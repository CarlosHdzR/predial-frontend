import { FormSearch } from '../components/forms';
import { PagoDetails, Loader, Message } from '../components/minors';
import { usePrediosContext } from '../context/PrediosContext';

function PagarImpuesto() {
    const { loading, errorFindingPredios, msgError } = usePrediosContext();

    return (
        <>
            <FormSearch
                title="Buscar mis predios"
                text="Código del predio:"
            />
            {loading && <Loader />}
            {errorFindingPredios && <Message msg={msgError} bgColor="#dc3545" />}
            <PagoDetails />
        </>
    )
}

export default PagarImpuesto;
