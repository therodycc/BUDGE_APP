import React, { useState } from "react";
import { ModalI } from "../../../interfaces/common/modal/modal.interface";
import LoadingSquareDestructuring from "../loading/loading-square-destructuring";

const Modal = ({ title, children, footer, setToggle, active }: ModalI) => {
    const [animation, setAnimation] = useState<boolean>(false);
    const closeModal = () => {
        setAnimation(true);
        setTimeout(() => {
            setToggle();
        }, 700);
    };
    return (
        <>
            <div className="modal-base">
                <div className="back-modal" onClick={closeModal} />
                <div className="show fade mx-3 position-fixed overflow-hidden">
                    <div
                        className={`bg-white shadow-lg modal-layout animate__animated  ${!animation ? "animate__bounceInUp" : "animate__bounceOutDown"
                            }`}
                    >
                        <LoadingSquareDestructuring />
                        <div className="p-3 pb-0 d-flex justify-content-between align-items-center">
                            <span className="fw-bolder rounded-pill bg-light py-1 px-5">
                                {title}
                            </span>
                            <div>
                                <button
                                    className="btn btn-danger btn-sm m-auto"
                                    onClick={closeModal}
                                >
                                    X
                                </button>
                            </div>
                        </div>
                        <hr />
                        <div className="px-4">{children}</div>
                        {/* <div className="modal-footer">
                            {footer}
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Modal;
