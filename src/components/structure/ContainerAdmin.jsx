import { NavLink } from 'react-router-dom';

function ContainerAdmin({ title, linkTo, subtitle, sep, subtitle2, error, children }) {
    return (
        <main id="main" className="main min-vh-100">
            <div className="pagetitle">
                <h1>{title}</h1>
                {subtitle &&
                    <nav>
                        <ol className="breadcrumb">
                            <NavLink to={linkTo}>
                                {subtitle}
                            </NavLink>
                            <>&nbsp;{sep}&nbsp;</>
                            <NavLink to="#">
                                {subtitle2}
                            </NavLink>
                        </ol>
                    </nav>
                }
            </div>
            {
                title === "Dashboard" ?
                    <>
                        {error}
                        <div className="row">
                            {children}
                        </div>
                    </>
                    :
                    <>
                        {error}
                        <div className="card">
                            <div className="card-body">
                                {children}
                            </div>
                        </div>
                    </>
            }
        </main >
    )
};

export default ContainerAdmin;
