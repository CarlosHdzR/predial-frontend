import { FormSearch } from '../components/forms';
import { PropertyDetails, Loader, Message } from '../components/minors';
import { usePrediosContext } from '../context/PropertiesContext';

function AssociateProperties() {
    const { foundPredios, loading, error, msgError } = usePrediosContext();

    return (
        <>
            <FormSearch />
            {loading && <Loader />}
            {(foundPredios.length === 0 && error) && <Message msg={msgError} bgColor="#dc3545" />}
            {foundPredios.map((predio) => (
                <PropertyDetails
                    key={predio._id}
                    predio={predio}
                />
            ))}
        </>
    )
}

export default AssociateProperties;
