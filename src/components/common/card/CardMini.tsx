import React from 'react'
import { CardMiniPropsI } from '../../../interfaces/common/card/card.interface'
import LoadingSquareDestructuring from '../loading/loading-square-destructuring'

const CardMini = ({ title, amount }: CardMiniPropsI) => {
    return (
        <>
            {(title && amount) ? (
                <div className="card">
                    <div className="card-body p-3 position-relative">
                        <div className="row">
                            <div className="col-7 text-start">
                                <p className="text-sm mb-1 text-capitalize font-weight-bold">{title}</p>
                                <h5 className="font-weight-bolder mb-0">
                                    {amount}
                                </h5>
                                <span className="text-sm text-end text-success font-weight-bolder mt-auto mb-0">+55% <span
                                    className="font-weight-normal text-secondary">since last month</span></span>
                            </div>
                            <div className="col-5">
                                <div className="dropdown text-end">
                                    <a className="cursor-pointer text-secondary">
                                        <span className="text-xs text-secondary">6 May - 7 May</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>) : (
                <div className="card overflow-hidden " style={{ height: "110px" }}>
                    <div className="row">
                        <div className="col-7 text-start">
                            <LoadingSquareDestructuring customClassLoading='person-card-loading' />
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default CardMini
