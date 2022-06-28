import React from 'react'
import { CardPropsI } from '../../../interfaces/common/card/card.interface'

const Card = ({ title, description, amount, icon, bgIcon }: CardPropsI) => {
    return (
        <>
            <div className="col-lg-6 col-md-6 col-sm-6 mb-3">
                <div className="card  mb-2">
                    <div className="card-header p-3 pt-2">
                        <div className={`d-flex justify-content-center align-items-center text-white icon icon-lg icon-shape bg-gradient-${bgIcon} shadow-dark shadow text-center border-radius-xl mt-n4 position-absolute`}>
                            {icon}
                        </div>
                        <div className="text-end pt-1">
                            <p className="text-sm mb-0 text-capitalize">{title}</p>
                            <h4 className="mb-0">{amount}</h4>
                        </div>
                    </div>
                    <hr className="dark horizontal my-0" />
                    <div className="card-footer p-3">
                        <p className="mb-0"><span className="text-success text-sm font-weight-bolder">+55% </span>{description}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card
