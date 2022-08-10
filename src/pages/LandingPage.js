import { LinkCard } from "../components/minors";
import { config } from "../config";
import { useAuthContext } from "../context/AuthContext";

function LandingPage() {
    const { auth } = useAuthContext();

    let path1 = auth ? "/user-ext/asociar-predios" : "/login";
    let path2 = auth ? "/user-ext/pagar" : "/register";
    let label1 = auth ? "Asociar predios" : "Iniciar Sesión";
    let label2 = auth ? "Pagar Impuesto Predial" : "¿No tienes una cuenta? Registrate aquí!!!";

    return (
        <>
            <h1 className="text-center font-weight-bold mt-5">
                Plataforma de Gestión Catastral
            </h1>
            <img src={config.ASSETS.LOGO_ESCUDO} alt="escudo-cauca"
                className="img-fluid d-block mx-auto mt-4"
            />
            <h3 className="text-center">Gobernación del Cauca</h3>
            <div className="row mt-5">
                <LinkCard
                    path={path1}
                    label={label1}
                />
                <LinkCard
                    path={path2}
                    label={label2}
                />
            </div>
        </>
    )
}

export default LandingPage;
