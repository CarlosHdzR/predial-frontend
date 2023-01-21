import { Link } from 'react-router-dom';
import { config } from '../config';

function Error404() {
    return (
        <div className="container-error-404">
        <section className="error-404 min-vh-100 vh-center flex-column">
            <div className="row vh-center">
                <h1 className="col">404</h1>
                <i className="col bi bi-emoji-dizzy-fill" />
            </div>
            <h2>La página a la que intentas acceder no existe!!!</h2>
            <Link to={-1} className="btn">
                <i className="bi bi-arrow-return-left me-2" /> Regresar
            </Link>
            <img src={config.ASSETS.NOT_FOUND} className="img-fluid" alt="Page Not Found" />
        </section>
        </div>
    )
}

export default Error404;
