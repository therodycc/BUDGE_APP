import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const CommentItem = () => {
    return (
        <>
            <div className="card">
                <div className="card-body p-3 d-flex justify-content-between">
                    <div className="d-flex px-2 py-0">
                        <span className="badge bg-gradient-dark me-3">
                            {"M.M"}
                        </span>
                        <div className="d-flex flex-column justify-content-center">
                            <h6 className="mb-0 text-sm">Basement</h6>
                        </div>
                    </div>

                    <div className="d-flex px-2 py-0">
                        <span className="badge bg-light text-secondary">12:00</span>
                    </div>
                </div>
                <div className="px-4">
                    <p className="text-sm">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsa quasi mollitia, itaque perspiciatis unde amet odit ducimus commodi cumque atque!
                    </p>
                </div>
                <div className="row p-3">
                    <div className="d-flex align-items-center cursor-pointer col-6">
                        <FontAwesomeIcon className="text-secondary me-2" icon={faHeart}/>
                        <span className="text-normal fw-bolder text-secondary">I like this idea</span>
                    </div>
                    <div className="d-flex align-items-center justify-content-end col-6">
                        <FontAwesomeIcon className="text-danger me-2" icon={faHeart}/>
                        <span className="text-normal fw-bolder text-secondary">256 likes</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CommentItem