function Modal({ children }) {
    return (
        <div
            className="modal fade" id="exampleModal" tabIndex="-1"
            aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <button
                            type="button" className="btn-close btn-danger"
                            data-bs-dismiss="modal" aria-label="Close" />
                    </div>
                    <div className="modal-body">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal;
