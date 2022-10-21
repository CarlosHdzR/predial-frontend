import { ButtonSpinner, NavTabs, ProfileOverview } from '../components/minors';
import { FormUser, FormChangePassword } from '../components/forms';
import { useUsersContext } from '../context/UsersContext';
import { useAuthContext } from '../context/AuthContext';

function MyProfile() {
    const { setUserToEdit, isSending } = useUsersContext();
    const { loggedUser } = useAuthContext();

    const handleEdit = () => {
        setUserToEdit(loggedUser);
    }

    return (
        <div className="card">
            <div className="card-body">
                <div className="profile col-12">
                    <NavTabs handleEdit={handleEdit} />
                    <div className="tab-content pt-3">
                        <ProfileOverview
                            loggedUser={loggedUser}
                        />
                        <div className="tab-pane" id="profile-edit">
                            <FormUser
                            >
                                <div className="col-5 col-sm-3 m-auto mt-3">
                                    <button className="my-btn-success w-100" type="submit">
                                        Editar {isSending && <ButtonSpinner />}
                                    </button>
                                </div>
                            </FormUser>
                        </div>
                        <div className="tab-pane" id="profile-change-password">
                            <FormChangePassword
                                loggedUser={loggedUser}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default MyProfile;
