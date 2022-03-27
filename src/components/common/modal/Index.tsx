import React from 'react'
import { ModalI } from '../../../interfaces/common/modal/modal.interface'

const Modal = ({ head, children, footer, setToggle }: ModalI) => {
    return (
        <>
            <div className='back-modal'>

                <div className="show fade">
                    <div className="modal-content">
                        <div className="modal-header py-0 mt-3">
                            {head}
                            <button className='btn btn-danger btn-sm ' onClick={() => setToggle()}>X</button>
                        </div>
                        <div className="modal-body">
                            {children}
                        </div>
                        {/* <div className="modal-footer">
                            {footer}
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal
