import { CardDashboard, CardChart, RecentActivity } from '../../minors';
import { UsersChart, PrediosChart } from '../../charts';
import jwtDecode from 'jwt-decode';

function Dashboard({ usersDb, prediosDb, historial, loader }) {
    const token = localStorage.getItem("token");
    const payload = jwtDecode(token);

    const countUsers = usersDb && ((rol) => usersDb.filter((e) => (e.rol === rol)).length)
    const countPredios = prediosDb && prediosDb.length

    const activityAdmin = historial.filter((e) => e.author !== "Administrador" && e).slice(-12).reverse()
    const activityUserInt = historial.filter((e) => e.author !== "Administrador" && e).slice(-6).reverse()


    return (
        <>
            <div className="dashboard col-lg-12">
                <div className="row">
                    {/* <!-- Usuarios Internos --> */}
                    {payload.rol === 1 &&
                        <CardDashboard
                            className="col-xxl-4 col-md-4"
                            cardClassName="user-int-card"
                            label="Usuarios Internos"
                            icon="bi bi-people"
                            data={countUsers(2)}
                        />
                    }
                    {/* <!-- Usuarios Externos --> */}
                    <CardDashboard
                        className={payload.rol !== 1 ? "col-xxl-6 col-md-6" : "col-xxl-4 col-md-4"}
                        cardClassName="user-ext-card"
                        label="Usuarios Externos"
                        icon="bi bi-people"
                        data={countUsers(3)}
                    />
                    {/* <!-- Predios--> */}
                    <CardDashboard
                        className={payload.rol !== 1 ? "col-xxl-6 col-md-6" : "col-xxl-4 col-md-4"}
                        cardClassName="predios-card"
                        label="Predios"
                        icon="bi bi-building"
                        data={countPredios}
                    />
                </div>
            </div>
            <div className="col-12 col-md-8">
                {/* <!-- Gráfica Actividad | Usuarios Internos --> */}
                {payload.rol === 1 &&
                    <CardChart label="Actividad | Usuarios Internos">
                        <UsersChart loader={loader} usersDb={usersDb} />
                    </CardChart>
                }
                {/* <!-- Gráfica Estadísticas | Predios --> */}
                <CardChart label="Estadísticas | Predios">
                    <PrediosChart loader={loader} prediosDb={prediosDb} />
                </CardChart>
            </div>
            {/* <!-- Actividad Reciente --> */}
            <div className="dashboard col-12 col-md-4">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">
                            Actividad Reciente
                        </h5>
                        <div className="activity">
                            {historial.length > 0 ?
                                <>
                                    {payload.rol === 1 ?
                                        activityAdmin.map((item) => (
                                            <RecentActivity key={item._id} item={item} />
                                        ))
                                        :
                                        activityUserInt.map((item) => (
                                            <RecentActivity key={item._id} item={item} />
                                        ))
                                    }
                                </>
                                :
                                <h2 className="text-center m-5 pt-5 pb-5">
                                    {loader}{!loader && "¡No hay información!"}
                                </h2>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Dashboard;
