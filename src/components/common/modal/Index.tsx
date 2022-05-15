import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { ModalI } from "../../../interfaces/common/modal/modal.interface";

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
                        style={{ borderRadius: "15px", overflow: "hidden" }}
                    >
                        {/* <LoadingSquareDestructuring /> */}
                        <div className="p-3 pb-0 d-flex justify-content-between align-items-center">
                            <span className="fw-bolder rounded-pill bg-light py-1 px-5">
                                {title}
                            </span>
                            <div>
                                <div
                                    onClick={closeModal}
                                    className={`rounded-circle text-white text-center bg-danger shadow-lg me-3 icon-rounded transition-sm cursor-pointer`}
                                >
                                    <FontAwesomeIcon icon={faClose} />
                                </div>
                            </div>
                        </div>
                        <hr className="text-clean" />
                        <div className="px-4">{children}</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Modal;
