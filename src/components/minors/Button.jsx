import React from 'react'
import { usePropertiesContext } from '../../context/PropertiesContext';
import { useUsersContext } from '../../context/UsersContext';

function Button({ label, onClick }) {
    const { isSending: isSendingUsers } = useUsersContext();
    const { isSending: isSendingProperties } = usePropertiesContext();
    const isSending = isSendingUsers || isSendingProperties;

    return (
        <div className="text-center m-auto mt-3">
            <button className="my-btn-success submit" onClick={onClick}>
                {isSending
                    ?
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    :
                    label
                }
            </button>
        </div>
    )
}

export default Button;