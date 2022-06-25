import { NavTabs, ProfileOverview } from '../minors';
import { FormUser, FormChangePassword } from '../forms';
import { getLoggedUser } from '../../auth';

function MyProfile({ loader, usersDb, payload, updateUser,
    userToEdit, setUserToEdit, changePassword }) {
    const loggedUser = getLoggedUser(usersDb, payload)

    const handleEdit = () => {
        setUserToEdit(loggedUser);
    }

    return (
        <div className="profile col-12">
            <NavTabs handleEdit={handleEdit} />
            <div className="tab-content pt-3">
                <ProfileOverview
                    loader={loader}
                    loggedUser={loggedUser}
                />
                <div className="tab-pane" id="profile-edit">
                    <FormUser
                        updateUser={updateUser}
                        userToEdit={userToEdit}
                        setUserToEdit={setUserToEdit}
                    >
                        <div className="col-5 col-sm-3 m-auto mt-3">
                            <button className="my-btn-success w-100" type="submit">
                                Editar
                            </button>
                        </div>
                    </FormUser>
                </div>
                <div className="tab-pane" id="profile-change-password">
                    <FormChangePassword
                        loader={loader}
                        loggedUser={loggedUser}
                        changePassword={changePassword}
                    />
                </div>
            </div>
        </div>
    )
};

export default MyProfile;
