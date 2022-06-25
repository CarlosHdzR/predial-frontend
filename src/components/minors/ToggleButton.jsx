import { useState } from "react";

function ToggleButton({ showLinks, setShowLinks }) {
    const [hoverBtn, setHoverBtn] = useState(false)

    return (
        <div className="toggle-btn btn-show-links"
            onClick={() => setShowLinks(!showLinks)}
            onMouseOver={() => { setHoverBtn(!hoverBtn) }}
            onMouseOut={() => { setHoverBtn(!hoverBtn) }}>
            <i className={
                `fa-solid ${(!showLinks && !hoverBtn)
                    ? "fa-bars" : (showLinks && !hoverBtn)
                        ? "fa-circle-xmark" : (!showLinks && hoverBtn)
                            ? "fa-bars fa-shake" : "fa-circle-xmark fa-shake"}`
            }
            />
        </div>
    )
}

export default ToggleButton