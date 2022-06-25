import { useState } from 'react';
import { NavbarAdmin, Sidebar, ContainerAdmin, FooterAdmin } from '../components/structure';
import {
    Dashboard, MyProfile, CreateUser, ManageUsers, EditUser,
    CreatePredio, ManagePredios, EditPredio
} from '../components/screens'
import { Loader, Message } from '../components/minors';
import { Auth, getPayload } from '../auth';
import { GetData, CrudUsers, CrudPredios, } from '../services';
import { Navigate } from 'react-router-dom';

function Admin({ screen }) {
    const [userToEdit, setUserToEdit] = useState(null);
    const [predioToEdit, setPredioToEdit] = useState(null);
    const [hideMenu, setHideMenu] = useState(false); // Toggle-Sidebar
    const { auth } = Auth()
    const payload = getPayload();
    const rol = payload && payload.rol

    const { usersDb, setUsersDb,
        prediosDb, setPrediosDb,
        historial, setHistorial,
        error, msgError, loading,
    } = GetData()

    const {
        createUser,
        updateUser,
        deleteUser,
        changePassword
    } = CrudUsers(usersDb, setUsersDb)

    const {
        createPredio,
        updatePredio,
        deletePredio
    } = CrudPredios(prediosDb, setPrediosDb, usersDb, setUsersDb, historial, setHistorial)

    return (
        <>
            {auth() && (rol === 1 || rol === 2) ?
                <main className={hideMenu ? "toggle-sidebar" : ""}>
                    <NavbarAdmin
                        usersDb={usersDb}
                        payload={payload}
                        hideMenu={hideMenu}
                        setHideMenu={setHideMenu}
                    />
                    <Sidebar />
                    <ContainerAdmin
                        title={screen}
                        linkTo={screen === "Editar Usuario" ? "/admin/manage-users" :
                            screen === "Editar Predio" ?
                                "/admin/manage-predios" : ""}
                        subtitle={screen === "Editar Usuario" ? "Gestionar Usuarios" :
                            screen === "Editar Predio" && "Gestionar Predios"
                        }
                        sep={(screen === "Editar Usuario" || screen === "Editar Predio") && "|"}
                        subtitle2={(screen === "Editar Usuario" || screen === "Editar Predio") && screen}
                        error={(
                            screen !== "Crear Usuario" &&
                            screen !== "Crear Predio" &&
                            screen !== "Editar Usuario" &&
                            screen !== "Editar Predio" && error) &&
                            <Message msg={msgError} bgColor="#dc3545" />
                        }
                    >
                        {screen === "Dashboard" &&
                            <Dashboard
                                usersDb={usersDb}
                                prediosDb={prediosDb}
                                historial={historial}
                                loader={loading && <Loader />}
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
                        {screen === "Crear Usuario" &&
                            <CreateUser
                                createUser={createUser}
                                setUserToEdit={setUserToEdit}
                            />}
                        {screen === "Gestionar Usuarios" &&
                            <ManageUsers
                                users={payload.rol === 1 ?
                                    usersDb.filter((user) => user.rol !== 1) :
                                    usersDb.filter((user) => user.rol === 3)}
                                loader={loading && <Loader />}
                                setUserToEdit={setUserToEdit}
                                deleteUser={deleteUser}
                            />}
                        {screen === "Editar Usuario" &&
                            <EditUser
                                updateUser={updateUser}
                                userToEdit={userToEdit}
                                setUserToEdit={setUserToEdit}
                            />}
                        {screen === "Crear Predio" &&
                            <CreatePredio
                                createPredio={createPredio}
                                setPredioToEdit={setPredioToEdit}
                            />}
                        {screen === "Gestionar Predios" &&
                            <ManagePredios
                                predios={prediosDb}
                                loader={loading && <Loader />}
                                setPredioToEdit={setPredioToEdit}
                                deletePredio={deletePredio}
                            />}
                        {screen === "Editar Predio" &&
                            <EditPredio
                                updatePredio={updatePredio}
                                predioToEdit={predioToEdit}
                                setPredioToEdit={setPredioToEdit}
                            />}
                    </ContainerAdmin>
                    <FooterAdmin />
                </main>
                :
                <>
                    <Navigate to={"/login"} />
                </>
            }
        </>
    );
}

export default Admin;