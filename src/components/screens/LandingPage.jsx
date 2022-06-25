import { Link } from "react-router-dom";
import { config } from "../../config";

function LandingPage({ links, labels }) {
    return (
        <>
            <img src={config.ASSETS.LOGO_ESCUDO} alt="escudo-cauca"
                className="img-fluid d-block mx-auto mt-4"
            />
            <h3 className="text-center">Gobernación del Cauca</h3>
            <div className="row mt-5">
                <div className="col-lg-6">
                    <div className="card card-link">
                        <Link to={links[0]}>
                            <h5 className="card-title text-center">
                                {labels[0]}
                            </h5>
                        </Link>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="card card-link">
                        <Link to={links[1]}>
                            <h5 className="card-title text-center">
                                {labels[1]}
                            </h5>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LandingPage;
