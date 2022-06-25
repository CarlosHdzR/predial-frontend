import { Input, InputFile, InputSelect } from '../inputs';
import { inputUsersProps, inputUsersRegisterProps } from './';
import { useFormUser } from '../../hooks';

const initialFormAdmin = {
    _id: null,
    nombres: "",
    apellidos: "",
    tipo_doc: "",
    nro_doc: "",
    email: "",
    telefono: "",
    direccion: "",
};

export const initialFormRegister = {
    _id: null,
    nombres: "",
    apellidos: "",
    tipo_doc: "",
    nro_doc: "",
    email: "",
    password: "",
    telefono: "",
    direccion: "",
};

function FormUser({
    createUser, registerUser, updateUser, userToEdit,
    setUserToEdit, deleteAvatar, terms, children }) {
    const initialForm = terms !== undefined ? initialFormRegister : initialFormAdmin
    const {
        form, pathImage, reset,
        handleChange, handleChangeFile,
        handleDeleteAvatar, handleSubmit,
    } = useFormUser({
        initialForm, initialFormRegister, createUser,
        registerUser, updateUser, userToEdit, setUserToEdit, deleteAvatar, terms
    });

    const inputProps = terms !== undefined ? inputUsersRegisterProps : inputUsersProps

    return (
        <form
            className="row g-3" encType="multipart/form-data"
            onSubmit={handleSubmit} noValidate
        >
            {terms === undefined &&
                <InputFile
                    pathImage={pathImage}
                    handleChangeFile={handleChangeFile}
                    handleDeleteAvatar={handleDeleteAvatar}
                />
            }
            {inputProps.map((input) => (
                <div key={input.id} className={input.className}>
                    {input.type === "select" ?
                        <InputSelect
                            {...input}
                            value={form[input.name]}
                            handleChange={handleChange}
                        />
                        :
                        <Input
                            {...input}
                            value={form[input.name]}
                            handleChange={handleChange}
                            reset={reset}
                        />
                    }
                </div>
            ))}
            {children}
        </form>
    )
}

export default FormUser;
