import { Tooltip } from '../minors'

function InputFile({ pathImage, handleChangeFile, handleDeleteAvatar }) {
    return (
        <div className="col-12 text-center mb-3">
            <img
                src={pathImage} alt="avatar"
                className="img-fluid rounded-circle avatar mb-2"
            />
            <Tooltip id="toolTipUpload" place="top">
                Subir imágen de perfil
            </Tooltip>
            <label data-tip data-for="toolTipUpload" className="btn my-btn-edit m-1">
                <input type="file" name="file" onChange={handleChangeFile} />
                <i className="bi bi-upload" />
            </label>
            <Tooltip id="toolTipDelete" place="top">
                Eliminar imágen de perfil
            </Tooltip>
            <label data-tip data-for="toolTipDelete" className="m-1">
                <button type="button" className="btn my-btn-delete" onClick={handleDeleteAvatar}>
                    <i className="bi bi-trash" />
                </button>
            </label>
        </div>

    )
}

export default InputFile