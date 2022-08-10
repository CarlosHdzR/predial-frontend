function InputCheck({ setTerms }) {
    const handleCheck = (e) => setTerms(e.target.checked);
    
    return (
        <div className="form-check col-9 col-sm-10 m-auto my-3">
            <input
                className="form-check-input" name="terminos" type="checkbox"
                id="acceptTerms" onChange={handleCheck} required
            />
            <label className="form-check-label" htmlFor="acceptTerms">
                Estoy de acuerdo y acepto los
                <a
                    href="https://www.mintic.gov.co/portal/715/articles-62124_politica_tratamiento_datos_personales_u20200917.pdf"
                    className="m-1" target="_blank" rel="noreferrer">
                    términos y condiciones
                </a>
            </label>
        </div>
    )
}

export default InputCheck;
