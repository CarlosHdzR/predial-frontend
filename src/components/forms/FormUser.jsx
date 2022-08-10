import { Input, InputFile, InputSelect } from '../inputs';
import { inputUsersProps, inputUsersRegisterProps } from './';
import { useFormUser } from '../../hooks';
import { useLocation, useParams } from 'react-router-dom';

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

function FormUser({ terms, children }) {
    const initialForm = terms !== undefined ? initialFormRegister : initialFormAdmin;
    const { nro_doc } = useParams();
    const param = nro_doc;
    const { pathname } = useLocation();
    const disableInput = pathname.includes("users/profile");
    const { form, pathImage, reset, handleChange, handleChangeFile,
        handleDeleteAvatar, handleSubmit } = useFormUser({ initialForm, param, terms });

    const inputProps = terms !== undefined ? inputUsersRegisterProps : inputUsersProps;

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
                    disableInput={disableInput}
                />
            }
            {inputProps.map((input) => (
                <div key={input.id} className={input.className}>
                    {input.type === "select" ?
                        <InputSelect
                            {...input}
                            value={form[input.name]}
                            disabled={disableInput && true}
                            handleChange={handleChange}
                        />
                        :
                        <Input
                            {...input}
                            value={form[input.name]}
                            readOnly={disableInput && true}
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
