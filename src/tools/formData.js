import { generatePassword } from "./"

export const formDataCreateUser = (formData, form, avatar, file) => {
    formData.append("nombres", form.nombres)
    formData.append("apellidos", form.apellidos)
    formData.append("tipo_doc", form.tipo_doc)
    formData.append("nro_doc", form.nro_doc)
    formData.append("email", form.email)
    formData.append("password", generatePassword(8))
    formData.append("telefono", form.telefono)
    formData.append("direccion", form.direccion)
    formData.append("rol", 2) // Rol 2 -> Usuario Interno
    formData.append("created_predios", 0)
    formData.append("edited_predios", 0)
    formData.append("deleted_predios", 0)
    formData.append("avatar", avatar)
    formData.append("imagen", file) // Archivo de imágen
}

export const formDataUpdateUser = (formData, form, avatar, file) => {
    formData.append("nombres", form.nombres)
    formData.append("apellidos", form.apellidos)
    formData.append("tipo_doc", form.tipo_doc)
    formData.append("nro_doc", form.nro_doc)
    formData.append("email", form.email)
    formData.append("telefono", form.telefono)
    formData.append("direccion", form.direccion)
    formData.append("avatar", avatar)
    formData.append("imagen", file) // Archivo de imágen
}
