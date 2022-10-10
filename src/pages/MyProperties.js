import { Loader, Message, PropertyDetails } from '../components/minors';
import { usePrediosContext } from '../context/PropertiesContext';

function MyProperties() {
    const { associatedPredios, loading, error, msgError } = usePrediosContext();

    if (loading) return <Loader />;
    if (error) return <Message msg={msgError} bgColor="#dc3545" />;

    return (
        <>
            {
                associatedPredios.length > 0
                    ?
                    <>
                        {associatedPredios.map((predio) => (
                            <PropertyDetails key={predio._id} predio={predio} />
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

export default MyProperties;
