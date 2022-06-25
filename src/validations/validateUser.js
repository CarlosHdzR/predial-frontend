import { toastValidate } from "../tools";
import { regExp } from "./regExp";

let regexText = regExp.text
let regexNros = regExp.number
let regexEmail = regExp.email
let regexPass = regExp.password
let regexTel = regExp.phone
let regexDir = regExp.address

export const validateUser = ({ form, usersDb, userToEdit, terms }) => {
    if (!form.nombres || !form.apellidos || !form.tipo_doc || !form.nro_doc
        || !form.email || (form.password !== undefined && !form.password) ||
        !form.telefono || !form.direccion) {
        toastValidate({ msg: "Todos los campos son requeridos!!!" })
        return false;
    }

    if (!regexText.test(form.nombres) || !regexText.test(form.apellidos) ||
        !regexNros.test(form.nro_doc) || !regexEmail.test(form.email) ||
        (form.password !== undefined && !regexPass.test(form.password)) || !regexTel.test(form.telefono) ||
        !regexDir.test(form.direccion)) {
        toastValidate({ msg: "Por favor, revise que todos los datos tengan el formato correcto!!!" })
        return false;
    }

    if (form._id === null) {
        const existingNroDoc = usersDb.filter((user) => user.nro_doc === parseInt(form.nro_doc))
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
        if ((userToEdit.nro_doc !== form.nro_doc) || (userToEdit.email !== form.email)) {
            const existingNroDoc = usersDb.filter((user) => user.nro_doc === parseInt(form.nro_doc))
            const existingEmail = usersDb.filter((user) => user.email === form.email)

            if (existingNroDoc.length > 0) {
                if (existingNroDoc[0].nro_doc !== userToEdit.nro_doc) {
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
