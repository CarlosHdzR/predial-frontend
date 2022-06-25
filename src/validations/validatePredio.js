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
    if (!form.codigo || !form.nom_prop || !form.doc_prop || !form.email_prop || !form.area_c ||
        !form.area_t | !form.valor_predio || !form.direccion_predio || !form.barrio || !form.fecha_pago
        || !form.fecha_pago2 || !form.fecha_pago3) {
        toastValidate({ msg: "Todos los campos son requeridos!!!" })
        return false;
    }

    if (!regexCod.test(form.codigo) || !regexText.test(form.nom_prop) || !regexNros.test(form.doc_prop) ||
        !regexEmail.test(form.email_prop) || !regexDec.test(form.area_c) || !regexDec.test(form.area_t) ||
        !regexCur.test(form.valor_predio) || !regexDir.test(form.direccion_predio) || !regexText.test(form.barrio)
    ) {
        toastValidate({ msg: "Por favor, revise que todos los datos tengan el formato correcto!!!" })
        return false;
    }

    if (parseFloat(form.area_c) > parseFloat(form.area_t)) {
        toastValidate({ msg: "El area construída debe ser menor o igual al area total!!!" })
        return false;
    }

    if (form._id === null) {
        const existingCodigo = prediosDb.filter((predio) => predio.codigo === form.codigo)
        const existingDirPredio = prediosDb.filter((predio) => predio.direccion_predio === form.direccion_predio)

        if (existingCodigo.length > 0) {
            toastValidate({ msg: "Ya existe un predio con ese código!!!" })
            return false
        }

        if (existingDirPredio.length > 0) {
            toastValidate({ msg: "Ya existe un predio con esa dirección!!!" })
            return false
        }
    } else {
        if ((predioToEdit.codigo !== form.codigo) || (predioToEdit.direccion_predio !== form.direccion_predio)) {
            const existingCodigo = prediosDb.filter((predio) => predio.codigo === form.codigo)
            const existingDirPredio = prediosDb.filter((predio) => predio.direccion_predio === form.direccion_predio)

            if (existingCodigo.length > 0) {
                if (existingCodigo[0].codigo !== predioToEdit.codigo) {
                    toastValidate({ msg: "Ya existe un predio con ese código!!!" })
                    return false
                }
            }

            if (existingDirPredio.length > 0) {
                if (existingDirPredio[0].direccion_predio !== predioToEdit.direccion_predio) {
                    toastValidate({ msg: "Ya existe un predio con esa dirección!!!" })
                    return false
                }
            }
        }
    }
    return true;
}
