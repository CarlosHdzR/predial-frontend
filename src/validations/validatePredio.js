import { toastValidate } from "../tools";
import { regExp } from "./regExp";

let regexText = regExp.text
let regexNros = regExp.number
let regexEmail = regExp.email
let regexDec = regExp.decimals
let regexCod = regExp.code
let regexCur = regExp.currency
let regexDir = regExp.address

export const validatePredio = ({ form, prediosDb, predioToEdit }) => {
    if (!form.code || !form.owner_name || !form.owner_id_number || !form.owner_email || !form.built_area ||
        !form.total_area | !form.property_value || !form.property_address || !form.neighborhood || !form.payment_date_1
        || !form.payment_date_2 || !form.payment_date_3) {
        toastValidate({ msg: "Todos los campos son requeridos!!!" })
        return false;
    }

    if (!regexCod.test(form.code) || !regexText.test(form.owner_name) || !regexNros.test(form.owner_id_number) ||
        !regexEmail.test(form.owner_email) || !regexDec.test(form.built_area) || !regexDec.test(form.total_area) ||
        !regexCur.test(form.property_value) || !regexDir.test(form.property_address) || !regexText.test(form.neighborhood)
    ) {
        toastValidate({ msg: "Por favor, revise que todos los datos tengan el formato correcto!!!" })
        return false;
    }

    if (parseFloat(form.built_area) > parseFloat(form.total_area)) {
        toastValidate({ msg: "El area construída debe ser menor o igual al area total!!!" })
        return false;
    }

    if (form._id === null) {
        const existingCodigo = prediosDb.filter((predio) => predio.code === form.code)
        const existingDirPredio = prediosDb.filter((predio) => predio.property_address === form.property_address)

        if (existingCodigo.length > 0) {
            toastValidate({ msg: "Ya existe un predio con ese código!!!" })
            return false
        }

        if (existingDirPredio.length > 0) {
            toastValidate({ msg: "Ya existe un predio con esa dirección!!!" })
            return false
        }
    } else {
        if ((predioToEdit.code !== form.code) || (predioToEdit.property_address !== form.property_address)) {
            const existingCodigo = prediosDb.filter((predio) => predio.code === form.code)
            const existingDirPredio = prediosDb.filter((predio) => predio.property_address === form.property_address)

            if (existingCodigo.length > 0) {
                if (existingCodigo[0].code !== predioToEdit.code) {
                    toastValidate({ msg: "Ya existe un predio con ese código!!!" })
                    return false
                }
            }

            if (existingDirPredio.length > 0) {
                if (existingDirPredio[0].property_address !== predioToEdit.property_address) {
                    toastValidate({ msg: "Ya existe un predio con esa dirección!!!" })
                    return false
                }
            }
        }
    }
    return true;
}
