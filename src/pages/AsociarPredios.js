import { FormSearch } from '../components/forms';
import { PredioDetails, Loader, Message } from '../components/minors';
import { usePrediosContext } from '../context/PrediosContext';

function AsociarPredios() {
    const { foundPredios, loading, error, msgError } = usePrediosContext();

    return (
        <>
            <FormSearch />
            {loading && <Loader />}
            {(foundPredios.length === 0 && error) && <Message msg={msgError} bgColor="#dc3545" />}
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
