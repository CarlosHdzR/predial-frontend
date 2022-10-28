import { toast } from 'react-toastify';

export const toastValidate = ({ msg, position }) => toast.error(
    msg,
    {
        toastId: "validate",
        position: position
    });