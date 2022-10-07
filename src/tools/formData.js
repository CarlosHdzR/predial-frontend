import { generatePassword } from "./"

export const formDataCreateUser = (formData, form, avatar, file) => {
    formData.append("name", form.name)
    formData.append("surname", form.surname)
    formData.append("id_type", form.id_type)
    formData.append("id_number", form.id_number)
    formData.append("email", form.email)
    formData.append("password", generatePassword(8))
    formData.append("phone", form.phone)
    formData.append("address", form.address)
    formData.append("role", 2) // Rol 2 -> Usuario Interno
    formData.append("created_properties", 0)
    formData.append("edited_properties", 0)
    formData.append("deleted_properties", 0)
    formData.append("avatar", avatar)
    formData.append("image", file) // Archivo de imágen
}

export const formDataUpdateUser = (formData, form, avatar, file) => {
    formData.append("name", form.name)
    formData.append("surname", form.surname)
    formData.append("id_type", form.id_type)
    formData.append("id_number", form.id_number)
    formData.append("email", form.email)
    formData.append("phone", form.phone)
    formData.append("address", form.address)
    formData.append("avatar", avatar)
    formData.append("image", file) // Archivo de imágen
}
