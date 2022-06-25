import { FormSearch } from '../../forms';
import { PagoDetails, Loader, Message } from '../../minors';
import { FindPredios } from '../../../services';

function PagarImpuesto() {
    const { predio, loading, error, msgError, handleSearchPredio } = FindPredios()

    return (
        <>
            <FormSearch
                title="Buscar mis predios"
                text="Código del predio:"
                handleSearch={handleSearchPredio}
            />
            {loading && <Loader />}
            {error && <Message msg={msgError} bgColor="#dc3545" />}
            <PagoDetails predio={predio} />
        </>
    )
}

export default PagarImpuesto;
