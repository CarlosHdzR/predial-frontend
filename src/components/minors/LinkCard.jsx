import { Link } from 'react-router-dom';

function LinkCard({ path, label }) {
    return (
        <>
            <div className="col-lg-6">
                <div className="card card-link">
                    <Link to={path}>
                        <h5 className="card-title text-center">
                            {label}
                        </h5>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default LinkCard;
