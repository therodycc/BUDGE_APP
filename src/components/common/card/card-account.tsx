import React from 'react'

export const CardAccount = () => {
    return (
        <div className="card bg-transparent shadow-xl">
            <div className="overflow-hidden position-relative border-radius-xl">
                <img src="/assets/images/pattern-tree.svg" className="position-absolute opacity-2 start-0 top-0 w-100 z-index-1 h-100" alt="pattern-tree" />
                <span className="mask bg-gradient-dark opacity-10" />
                <div className="card-body position-relative z-index-1 p-3">
                    <i className="material-icons text-white p-2">wifi</i>
                    <h5 className="text-white mt-4 mb-5 pb-2">4562&nbsp;&nbsp;&nbsp;1122&nbsp;&nbsp;&nbsp;4594&nbsp;&nbsp;&nbsp;7852</h5>
                    <div className="d-flex">
                        <div className="d-flex">
                            <div className="me-4">
                                <p className="text-white text-sm opacity-8 mb-0">Card Holder</p>
                                <h6 className="text-white mb-0">Jack Peterson</h6>
                            </div>
                            <div>
                                <p className="text-white text-sm opacity-8 mb-0">Expires</p>
                                <h6 className="text-white mb-0">11/22</h6>
                            </div>
                        </div>
                        <div className="ms-auto w-20 d-flex align-items-end justify-content-end">
                            <img className="w-60 mt-2" src="/assets/images/account.svg" alt="logo" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
