import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDownUpAcrossLine } from '@fortawesome/free-solid-svg-icons';

const FloatMenu = () => {
    return (
        <>
            <ul className="dropdown-menu shadow-lg dropdown-menu-end p-2 me-sm-n4 show" data-bs-popper="none">
                {[1, 2, 3, 4].map(_ => (
                    <li className="mb-2">
                        <a className="dropdown-item border-radius-md cursor-pointer">
                            <div className="d-flex align-items-center py-1">
                                <FontAwesomeIcon icon={faArrowDownUpAcrossLine} />
                                <div className="ms-2">
                                    <h6 className="text-sm font-weight-normal my-auto">
                                        Check new messages
                                    </h6>
                                </div>
                            </div>
                        </a>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default FloatMenu