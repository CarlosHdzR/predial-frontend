import { FormSearch } from '../../forms';
import { PredioDetails, Loader, Message } from '../../minors';
import { FindPredios } from '../../../services';

function AsociarPredios() {
    const { predios, loading, error, msgError, handleSearchPredios } = FindPredios()

    return (
        <>
            <FormSearch
                title="Buscar predios"
                text="Documento del propietario:"
                handleSearch={handleSearchPredios}
            />
            {loading && <Loader />}
            {error && <Message msg={msgError} bgColor="#dc3545" />}
            {predios.map((predio) => (
                <PredioDetails
                    key={predio._id}
                    predio={predio}
                />
            ))}
        </>
    )
}

export default AsociarPredios;
