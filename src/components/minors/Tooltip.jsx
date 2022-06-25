import ReactTooltip from 'react-tooltip';

function Tooltip({ id, place, children }) {
    return (
        <ReactTooltip id={id} place={place} type="dark" effect="solid" delayShow={1000}>
            {children}
        </ReactTooltip>
    )
};

export default Tooltip;