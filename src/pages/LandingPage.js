import { LinkCard } from "../components/minors";
import { config } from "../config";
import { useAuthContext } from "../context";

function LandingPage() {
    const { auth } = useAuthContext();

    let path1 = auth ? "/user-ext/associate-properties" : "/login";
    let path2 = auth ? "/user-ext/my-properties" : "/register";
    let label1 = auth ? "Asociar predios" : "Iniciar Sesión";
    let label2 = auth ? "Mis Predios" : "¿No tienes una cuenta? Registrate aquí!!!";

    return (
        <>
            <h1 className="my-title mt-5">
                Plataforma de Gestión Catastral
            </h1>
            <img src={config.ASSETS.LOGO_ESCUDO} alt="escudo-cauca"
                className="logo-escudo img-fluid d-block mx-auto mt-4"
            />
            <h3 className="escudo-title text-center">Gobernación del Atlántico</h3>
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
