import { useEffect, useState } from 'react';
import { Auth } from '../auth';
import { GetData } from '../services';
import { formDataCreateUser, formDataUpdateUser, toastValidate } from '../tools';
import { validateUser } from '../validations';
import { config } from '../config';

const { DEFAULT_AVATAR, IMG_LOADING } = config.ASSETS

export const useFormUser = ({ initialForm, createUser, registerUser, updateUser,
    userToEdit, setUserToEdit, terms }) => {
    const [form, setForm] = useState(initialForm);
    const [file, setFile] = useState("");
    const [avatar, setAvatar] = useState("")
    const [pathImage, setPathImage] = useState(IMG_LOADING)
    const [reset, setReset] = useState(false);
    const { usersDb } = GetData()
    const { login } = Auth()

    useEffect(() => {
        if (userToEdit) {
            setPathImage(userToEdit.avatar.secure_url || DEFAULT_AVATAR)
            setForm(userToEdit);
        } else {
            setPathImage(DEFAULT_AVATAR)
            setForm(initialForm);
        }
    }, [userToEdit, initialForm]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        })
    };

    const handleChangeFile = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const image = e.target.files[0];
            if (image.type.includes("image")) {
                const reader = new FileReader()
                reader.readAsDataURL(image)
                reader.onload = function load() {
                    setPathImage(reader.result)
                }
                setFile(image)
            }
        }
    }

    const handleDeleteAvatar = (e) => {
        setFile("")
        setAvatar("delete")
        setPathImage(DEFAULT_AVATAR)
    }

    const handleReset = (e) => {
        setForm(initialForm);
        setUserToEdit(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateUser({ form, usersDb, userToEdit, terms })) {
            if (terms === undefined) {
                if (form._id === null) { // Crear usuario interno - Rol 2
                    const formData = new FormData();
                    formDataCreateUser(formData, form, avatar, file)
                    createUser(formData);
                    setPathImage(DEFAULT_AVATAR)
                    handleReset();
                    setReset(!reset);
                } else { // Editar usuarios
                    const formData = new FormData();
                    formDataUpdateUser(formData, form, avatar, file)
                    let _id = userToEdit._id
                    updateUser(formData, _id);
                    setFile("");
                }
            } else { // Registro usuario externo - Rol 3
                form.rol = 3
                registerUser(form)
                setReset(!reset)
            }
        }
    };

    const handleSubmitLogin = (e) => {
        e.preventDefault();
        if (!form.email || !form.password) {
            toastValidate({ msg: "Datos incompletos!!!" })
            return;
        }
        login(form)
    };

    return {
        form,
        pathImage,
        reset,
        handleChange,
        handleChangeFile,
        handleDeleteAvatar,
        handleSubmit,
        handleSubmitLogin
    }
}