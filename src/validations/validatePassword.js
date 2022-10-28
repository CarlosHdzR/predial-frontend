import { toastValidate } from "../tools";
import { regExps } from "./regExps";

let regexPass = regExps.password

export const validatePassword = (form) => {
    if ((form.currentPassword !== undefined && !form.currentPassword) ||
        !form.newPassword || !form.renewPassword) {
        toastValidate({ msg: "Todos los campos son requeridos!!!" })
        return false;
    }

    if (!regexPass.test(form.newPassword)) {
        toastValidate({ msg: "Por favor, revisa que la contraseña tenga el formato correcto!!!" })
        return false;
    }

    if (form.newPassword !== form.renewPassword) {
        toastValidate({ msg: "Las contraseñas no coinciden!!!" });
        return false;
    }
    return true;
}
