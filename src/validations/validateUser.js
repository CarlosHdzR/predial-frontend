import { toastValidate } from "../tools";
import { regExp } from "./regExp";

let regexText = regExp.text
let regexNros = regExp.number
let regexEmail = regExp.email
let regexPass = regExp.password
let regexTel = regExp.phone
let regexDir = regExp.address

export const validateUser = ({ form, usersDb, userToEdit, terms }) => {
    if (!form.name || !form.surname || !form.id_type || form.id_type === "Seleccionar" ||
        !form.id_number || !form.email || (form.password !== undefined && !form.password) ||
        !form.phone || !form.address) {
        toastValidate({ msg: "Todos los campos son requeridos!!!" })
        return false;
    }

    if (!regexText.test(form.name) || !regexText.test(form.surname) ||
        !regexNros.test(form.id_number) || !regexEmail.test(form.email) ||
        (form.password !== undefined && !regexPass.test(form.password)) || !regexTel.test(form.phone) ||
        !regexDir.test(form.address)) {
        toastValidate({ msg: "Por favor, revise que todos los datos tengan el formato correcto!!!" })
        return false;
    }

    if (form._id === null) {
        const existingNroDoc = usersDb.filter((user) => user.id_number === parseInt(form.id_number))
        const existingEmail = usersDb.filter((user) => user.email === form.email)

        if (existingNroDoc.length > 0) {
            toastValidate({ msg: "Ya existe un usuario con ese número de documento!!!" })
            return false
        }

        if (existingEmail.length > 0) {
            toastValidate({ msg: "Ya existe un usuario con ese correo electrónico!!!" })
            return false
        }
    } else {
        if ((userToEdit.id_number !== form.id_number) || (userToEdit.email !== form.email)) {
            const existingNroDoc = usersDb.filter((user) => user.id_number === parseInt(form.id_number))
            const existingEmail = usersDb.filter((user) => user.email === form.email)

            if (existingNroDoc.length > 0) {
                if (existingNroDoc[0].id_number !== userToEdit.id_number) {
                    toastValidate({ msg: "Ya existe un usuario con ese número de documento!!!" })
                    return false
                }
            }

            if (existingEmail.length > 0) {
                if (existingEmail[0].email !== userToEdit.email) {
                    toastValidate({ msg: "Ya existe un usuario con ese correo electrónico!!!" })
                    return false
                }
            }
        }
    }

    if (terms !== undefined && !terms) {
        toastValidate({ msg: "Para crear tu cuenta debes aceptar los términos y condiciones!!!" })
        return false;
    }
    return true;
}
