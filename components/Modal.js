import React from "react";

const Modal = ({title, closeModal, children, show}) => {
    return (
        <>
        {show && <div className="modal-backdrop fade show"></div>}

        <div 
            className={`modal fade ${show ? "show" : ""} text-left`} 
            style={{ display: show ? "block" : "none" }}
            id="inlineForm"
            tabindex="-1"
            role="dialog"
            aria-labelledby="myModalLabel33"
            aria-hidden="true">
            <div
                className="modal-dialog modal-dialog-centered modal-dialog-scrollable"
                role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title" id="myModalLabel33">
                            {title}
                        </h4>
                        <button onClick={closeModal} type="button" className="close" aria-label="Close">
                            <i className="bi bi-x"></i>
                        </button>
                    </div>
                    {children}
                </div>
            </div>
        </div>
        </>
    );
};

export default Modal;