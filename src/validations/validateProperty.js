import { toastValidate } from "../tools";
import { regExp } from "./regExp";

let regexText = regExp.text
let regexNros = regExp.number
let regexEmail = regExp.email
let regexDec = regExp.decimals
let regexCod = regExp.code
let regexCur = regExp.currency
let regexDir = regExp.address

export const validateProperty = ({ form, propertiesDb, propertyToEdit }) => {
    if (!form.code || !form.owner_name || !form.owner_id_number || !form.owner_email || !form.built_area ||
        !form.total_area | !form.value || !form.address || !form.neighborhood || !form.payment_date_1
        || !form.payment_date_2 || !form.payment_date_3) {
        toastValidate({ msg: "Todos los campos son requeridos!!!" })
        return false;
    }

    if (!regexCod.test(form.code) || !regexText.test(form.owner_name) || !regexNros.test(form.owner_id_number) ||
        !regexEmail.test(form.owner_email) || !regexDec.test(form.built_area) || !regexDec.test(form.total_area) ||
        !regexCur.test(form.value) || !regexDir.test(form.address) || !regexText.test(form.neighborhood)
    ) {
        toastValidate({ msg: "Por favor, revise que todos los datos tengan el formato correcto!!!" })
        return false;
    }

    if (parseFloat(form.built_area) > parseFloat(form.total_area)) {
        toastValidate({ msg: "El area construída debe ser menor o igual al area total!!!" })
        return false;
    }

    if (form._id === null) {
        const existingCode = propertiesDb.filter((property) => property.code === form.code)
        const existingAddress = propertiesDb.filter((property) => property.address === form.address)

        if (existingCode.length > 0) {
            toastValidate({ msg: "Ya existe un predio con ese código!!!" })
            return false
        }

        if (existingAddress.length > 0) {
            toastValidate({ msg: "Ya existe un predio con esa dirección!!!" })
            return false
        }
    } else {
        if ((propertyToEdit.code !== form.code) || (propertyToEdit.address !== form.address)) {
            const existingCode = propertiesDb.filter((property) => property.code === form.code)
            const existingAddress = propertiesDb.filter((property) => property.address === form.address)

            if (existingCode.length > 0) {
                if (existingCode[0].code !== propertyToEdit.code) {
                    toastValidate({ msg: "Ya existe un predio con ese código!!!" })
                    return false
                }
            }

            if (existingAddress.length > 0) {
                if (existingAddress[0].address !== propertyToEdit.address) {
                    toastValidate({ msg: "Ya existe un predio con esa dirección!!!" })
                    return false
                }
            }
        }
    }
    return true;
}