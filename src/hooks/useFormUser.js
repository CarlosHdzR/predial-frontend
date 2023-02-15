import { useEffect, useState } from 'react';
import { formDataCreateUser, formDataUpdateUser, toastValidate } from '../tools';
import { validatePassword, validateUser } from '../validations';
import { config } from '../config';
import { AuthServices, UsersServices } from '../services';
import { useUsersContext } from '../context';

const { DEFAULT_AVATAR, IMG_LOADING } = config.ASSETS

export const useFormUser = ({ initialForm, param, terms }) => {
    const [form, setForm] = useState(initialForm);
    const [file, setFile] = useState("");
    const [avatar, setAvatar] = useState("");
    const [pathImage, setPathImage] = useState(IMG_LOADING);
    const [reset, setReset] = useState(false);
    const { usersDb, userToEdit, setUserToEdit } = useUsersContext();
    const { createUser, registerUser, updateUser } = UsersServices();
    const { login, changePassword } = AuthServices();

    useEffect(() => {
        try {
            if (param) { // Validar si va a crear o editar
                setPathImage(userToEdit.avatar?.secure_url || DEFAULT_AVATAR)
                setForm(userToEdit._id && userToEdit);
            } else {
                setPathImage(DEFAULT_AVATAR)
                setForm(initialForm);
            }
        } catch (error) {
            console.log(error.message);
            setPathImage(DEFAULT_AVATAR)
            setForm(initialForm);
        }
    }, [param, userToEdit, initialForm]);

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

    const handleDeleteAvatar = () => {
        setFile("")
        setAvatar("delete")
        setPathImage(DEFAULT_AVATAR)
    }

    const handleReset = () => {
        setForm(initialForm);
        setUserToEdit(null);
        setReset(!reset);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateUser({ form, usersDb, userToEdit, terms })) {
            if (terms === undefined) {
                if (form._id === null) { // Crear usuario interno - Rol 2
                    const formData = new FormData();
                    formDataCreateUser(formData, form, avatar, file)
                    createUser(formData);
                    setPathImage(DEFAULT_AVATAR);
                    handleReset();
                } else { // Editar usuarios
                    const formData = new FormData();
                    formDataUpdateUser(formData, form, avatar, file);
                    let _id = userToEdit._id;
                    updateUser(formData, _id);
                    setFile("");
                }
            } else { // Crear usuario externo (Registro) - Rol 3
                form.role = 3;
                registerUser(form);
                setReset(!reset);
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

    const handleSubmitChangePassword = (e) => {
        e.preventDefault();
        if (validatePassword(form)) {
            changePassword(form);
        }
    };


    return {
        form,
        pathImage,
        reset,
        handleChange,
        handleChangeFile,
        handleDeleteAvatar,
        handleSubmit,
        handleSubmitLogin,
        handleSubmitChangePassword
    }
}
