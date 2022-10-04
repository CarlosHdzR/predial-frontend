import { Loader, PredioDetails } from '../components/minors';
import { usePrediosContext } from '../context/PrediosContext';

function PagarImpuesto() {
    const { associatedPredios, loading } = usePrediosContext();
    if (loading) return <Loader />

    return (
        <>
            {
                associatedPredios.length > 0
                    ?
                    <>
                        {associatedPredios.map((predio) => (
                            <PredioDetails key={predio._id} predio={predio} />
                        ))}
                    </>
                    :
                    <>
                        <div className="card mt-4">
                            <h1 className="text-center text-xl my-5">¡No tienes predios asociados a tu cuenta!</h1>
                        </div>
                    </>
            }
        </>
    )
}

export default PagarImpuesto;
