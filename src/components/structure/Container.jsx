function Container({ title, error, children }) {
    return (
        <main className="vh-center min-vh-100" >
            <div className="container">
                <h1 className="text-center font-weight-bold mt-5">
                    {title}
                </h1>
                {error}
                {title === "Mi Perfil" ?
                    <div className="card">
                        <div className="card-body">
                            {children}
                        </div>
                    </div>
                    :
                    <>
                        {children}
                    </>
                }
            </div>
        </main>
    )
}

export default Container;
