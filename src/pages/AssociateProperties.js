import { FormSearch } from '../components/forms';
import { PropertyDetails, Loader, Message } from '../components/minors';
import { usePropertiesContext } from '../context';

function AssociateProperties() {
    const { foundProperties, propertiesError, isLoading } = usePropertiesContext();

    return (
        <>
            <FormSearch />
            {isLoading && <Loader />}
            {propertiesError && <Message msg={propertiesError.msg} bgColor="#dc3545" />}
            {foundProperties.map((property) => (
                <PropertyDetails
                    key={property._id}
                    property={property}
                />
            ))}
        </>
    )
}

export default AssociateProperties;
