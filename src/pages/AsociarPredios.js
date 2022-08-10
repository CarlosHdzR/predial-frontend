import { FormSearch } from '../components/forms';
import { PredioDetails, Loader, Message } from '../components/minors';
import { usePrediosContext } from '../context/PrediosContext';

function AsociarPredios() {
    const { foundPredios, loading, errorFindingPredios, msgError } = usePrediosContext();

    return (
        <>
            <FormSearch
                title="Buscar predios"
                text="Documento del propietario:"
            />
            {loading && <Loader />}
            {errorFindingPredios && <Message msg={msgError} bgColor="#dc3545" />}
            {foundPredios.map((predio) => (
                <PredioDetails
                    key={predio._id}
                    predio={predio}
                />
            ))}
        </>
    )
}

export default AsociarPredios;
