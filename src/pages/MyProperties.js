import { Loader, Message, PropertyDetails } from '../components/minors';
import { usePropertiesContext } from '../context';

function MyProperties() {
    const { associatedProperties, propertiesError, isLoading } = usePropertiesContext();

    if (isLoading) return <div className="mt-5"><Loader /></div>;
    if (propertiesError) return <div className="mt-5"><Message msg={propertiesError.msg} bgColor="#dc3545" /></div>;

    return (
        <>
            {associatedProperties.length > 0
                ?
                <>
                    {associatedProperties.map((property) => (
                        <PropertyDetails key={property._id} property={property} />
                    ))}
                </>
                :
                <>
                    <div className="card mt-4" id="rounded">
                        <h1 className="text-center text-xl my-5">¡No tienes predios asociados a tu cuenta!</h1>
                    </div>
                </>
            }
        </>
    )
}

export default MyProperties;
