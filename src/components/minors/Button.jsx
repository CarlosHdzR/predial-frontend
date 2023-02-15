import React from 'react'
import { useAuthContext, usePropertiesContext, useUsersContext } from '../../context';

function Button({ label, onClick, classDiv }) {
    const { isSending: isSendingUsers } = useUsersContext();
    const { isSending: isSendingProperties } = usePropertiesContext();
    const { isSending: isSendingAuth } = useAuthContext();
    const isSending = isSendingUsers || isSendingProperties || isSendingAuth;

    return (
        <div className={`${classDiv} text-center m-auto mt-3`}>
            <button className="my-btn-success submit" disabled={isSending ? true : false} onClick={onClick}>
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