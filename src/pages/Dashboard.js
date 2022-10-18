import { CardDashboard, CardChart, RecentActivity, Loader } from '../components/minors';
import { UsersChart, PropertiesChart } from '../components/charts';
import { useUsersContext } from '../context/UsersContext';
import { usePropertiesContext } from '../context/PropertiesContext';
import { useAuthContext } from '../context/AuthContext';
import { useHandleError } from '../hooks';

function Dashboard() {
    const { usersDb, loading } = useUsersContext();
    const { payload } = useAuthContext();
    const { propertiesDb, recordsDb } = usePropertiesContext();

    const countUsers = (role) => usersDb?.filter((e) => (e.role === role)).length;
    const countProperties = propertiesDb?.length;
    const records = recordsDb?.filter((e) => e.author !== "Administrador" && e);
    const sliceAt = payload?.role === 1 ? -12 : -5;

    const loader = loading && <Loader />;

    return (
        <div className="row">
            <div className="dashboard col-lg-12">
                <div className="row">
                    {payload.role === 1 &&
                        <CardDashboard
                            label="Usuarios Internos"
                            data={countUsers(2)}
                        />
                    }
                    <CardDashboard
                        label="Usuarios Externos"
                        data={countUsers(3)}
                    />
                    <CardDashboard
                        label="Predios"
                        data={countProperties}
                    />
                </div>
            </div>
            {/* <!-- Gráficas --> */}
            <div className="col-12 col-md-8">
                {payload.role === 1 &&
                    <CardChart label="Actividad | Usuarios Internos">
                        <UsersChart
                            loader={loader}
                            usersDb={usersDb} />
                    </CardChart>
                }
                <CardChart label="Estadísticas | Predios">
                    <PropertiesChart
                        loader={loader}
                        propertiesDb={propertiesDb} />
                </CardChart>
            </div>
            {/* <!-- Actividad Reciente --> */}
            <div className="dashboard col-12 col-md-4">
                <div className="card">
                    <div className="activity card-body">
                        <h5 className="card-title">Actividad Reciente</h5>
                        {records.length > 0 ?
                            records.slice(sliceAt).reverse().map((record) => (
                                <RecentActivity key={record._id} record={record} />
                            ))
                            :
                            <h2 className="text-center m-5 pt-5 pb-5">
                                {loader}{!loader && "¡No hay información!"}
                            </h2>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Dashboard;
