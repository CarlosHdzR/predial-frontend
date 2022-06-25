import { Navbar, Container, Footer } from '../components/structure';
import { LandingPage, Login, Register, ForgotPassword, ResetPassword } from "../components/screens";
import { Navigate } from 'react-router-dom';
import { Auth, getPayload } from '../auth';

function SystemOut({ screen }) {
    const { auth } = Auth()
    const payload = getPayload()
    const rol = payload && payload.rol
    const path = (rol === 1 || rol === 2) ? "/admin/dashboard" : "/user-ext/home"

    return (
        <>
            {!auth() ?
                <>
                    <Navbar
                        text={screen === "Login" ? "Registrarse" : "Iniciar Sesión"}
                        path={screen === "Login" ? "/register" : "/login"}
                    />
                    <Container title={screen === "LandingPage" && "Plataforma de Gestión Catastral"}>
                        {screen === "LandingPage" &&
                            <LandingPage
                                links={["/login", "/register"]}
                                labels={["Iniciar Sesión", "¿No tienes una cuenta? Registrate aquí!!!"]}
                            />}
                        {screen === "Login" &&
                            <Login />}
                        {screen === "Register" &&
                            <Register />}
                        {screen === "ForgotPassword" &&
                            <ForgotPassword />}
                        {screen === "ResetPassword" &&
                            <ResetPassword />}
                    </Container>
                    <Footer />
                </>
                :
                <Navigate to={path} />
            }
        </>
    );
}

export default SystemOut;
