import { config } from "../../config";
import { useAuthContext } from "../../context/AuthContext";
import { useUsersContext } from "../../context/UsersContext";
import Loader from "./Loader";

function ProfileOverview() {
    const { isLoading } = useUsersContext();
    const { loggedUser } = useAuthContext();
    const { avatar, name, surname, id_number, email, phone, address } = loggedUser || {};
    const { secure_url } = avatar || {};
    const { DEFAULT_AVATAR } = config.ASSETS;

    let loader = isLoading && <Loader />

    const profileItems = [
        {
            id: 1,
            label: "Nombre Completo",
            data: `${name} ${surname}`
        },
        {
            id: 2,
            label: "Número de Documento",
            data: id_number
        },
        {
            id: 3,
            label: "Correo Electrónico",
            data: email
        },
        {
            id: 4,
            label: "Dirección de Residencia",
            data: address
        },
        {
            id: 5,
            label: "Teléfono",
            data: phone
        },
    ]

    return (
        <div className="tab-pane show active profile-overview" id="profile-overview">
            {loggedUser ?
                <>
                    <div className="card-body profile-card">
                        <img
                            src={secure_url || DEFAULT_AVATAR}
                            alt="avatar" className="img-fluid rounded-circle avatar"
                        />
                        <h2 className="text-center p-1">{name + " " + surname}</h2>
                    </div>
                    <div className="col-12 col-sm-9 col-lg-6 text-center m-auto">
                        {profileItems.map((item) => (
                            <div key={item.id} className="row vh-center">
                                <div className="col-7 col-md-5 col-md-6 col-lg-6 label">
                                    {item.label}:
                                </div>
                                <div className="col-7 col-md-5 col-md-6 col-lg-6">
                                    {item.data}
                                </div>
                            </div>
                        ))}
                    </div>
                </>
                :
                <h2 className="text-center m-5">{loader}{!loader && "¡No hay información!"}</h2>
            }
        </div>
    )
}

export default ProfileOverview;
