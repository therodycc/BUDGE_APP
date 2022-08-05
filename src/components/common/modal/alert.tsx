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
                        className={`bg-white shadow-lg modal-layout animate__animated  ${!animation ? "animate__bounceInUp" : "animate__bounceOutDown"}`}
                        style={{ borderRadius: "15px", overflow: "hidden" }}
                    >
                        <div className="p-3 pb-0 d-flex justify-content-between align-items-center">
                            <div className="px-4">
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Modal;
