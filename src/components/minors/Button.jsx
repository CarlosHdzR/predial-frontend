import React from 'react'
import { useUsersContext } from '../../context/UsersContext';

function Button({ label, onClick }) {
    const { isSending } = useUsersContext();

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