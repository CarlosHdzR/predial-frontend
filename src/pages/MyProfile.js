import { Button, NavTabs, ProfileOverview } from '../components/minors';
import { FormUser, FormChangePassword } from '../components/forms';
import { useAuthContext } from '../context';

function MyProfile() {
    const { loggedUser, payload } = useAuthContext();
    const role = payload?.role;

    return (
        <div className="card" id={`${role === 3 ? "rounded" : ""}`}>
            <div className="card-body">
                <div className="profile col-12">
                    <NavTabs />
                    <div className="tab-content pt-3">
                        <ProfileOverview
                            loggedUser={loggedUser}
                        />
                        <div className="tab-pane" id="profile-edit">
                            <FormUser
                            >
                                <Button label="Editar"/>
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
