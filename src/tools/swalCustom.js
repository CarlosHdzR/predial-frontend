import Swal from "sweetalert2";

export const swalConfirm = ({ msg, icon }) => Swal.fire({
    html: msg,
    icon: icon,
    showCancelButton: true,
    confirmButtonColor: '#0b295e',
    cancelButtonColor: '#be0d1f',
    confirmButtonText: 'Eliminar',
    cancelButtonText: 'Cancelar'
})

export const swalAlert = ({ msg, icon }) => Swal.fire({
    html: msg,
    icon: icon,
    showCloseButton: true,
    showConfirmButton: false,
    timer: 10000,
    timerProgressBar: true,
})
