import { useState } from 'react';
import { Navbar, Container, Footer } from '../components/structure';
import { LandingPage, AsociarPredios, PagarImpuesto, MyProfile } from "../components/screens";
import { Loader, Message } from '../components/minors';
import { Auth, getPayload } from '../auth';
import { GetData, CrudUsers } from '../services';
import { Navigate } from 'react-router-dom';

function UserExt({ screen }) {
    const [userToEdit, setUserToEdit] = useState(null);
    const { usersDb, setUsersDb, error, msgError, loading } = GetData()
    const { updateUser, changePassword } = CrudUsers(usersDb, setUsersDb)
    const { auth } = Auth()
    const payload = getPayload();
    const rol = payload && payload.rol

    return (
        <>
            {auth() && rol === 3 ?
                <>
                    <Navbar usersDb={usersDb} payload={payload} />
                    <Container
                        title={screen === "Home" ? "Plataforma de Gestión Catastral" :
                            screen === "Pagar Impuesto" ? "Pagar Impuesto Predial" : screen}
                        error={(screen === "Mi Perfil" && error) &&
                            <Message msg={msgError} bgColor="#dc3545" />
                        }
                    >
                        {screen === "Home" &&
                            <LandingPage
                                links={["/user-ext/asociar-predios", "/user-ext/pagar"]}
                                labels={["Asociar predios", "Pagar impuesto predial"]}
                            />}
                        {screen === "Mi Perfil" &&
                            <MyProfile
                                usersDb={usersDb}
                                loader={loading && <Loader />}
                                payload={payload}
                                updateUser={updateUser}
                                userToEdit={userToEdit}
                                setUserToEdit={setUserToEdit}
                                changePassword={changePassword}
                            />}
                        {screen === "Asociar Predios" && <AsociarPredios />}
                        {screen === "Pagar Impuesto" && <PagarImpuesto />}
                    </Container>
                    <Footer />
                </>
                :
                <>
                    <Navigate to={"/login"} />
                </>
            }
        </>
    )
}

export default UserExt;
