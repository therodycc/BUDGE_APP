import { faCartArrowDown, faCartPlus, faHourglassEmpty } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { FC } from 'react'
import { currencyFormat } from '../../../helpers/currency.helper'
export interface DTProfileTablePropsI {
    name: string
    image: string
    expense: number
    paidOut: number
    category: string
    inMonth?: boolean
}
const DTProfileTable: FC<DTProfileTablePropsI> = ({ category, expense, image, name, paidOut, inMonth = false }) => {
    return (
        <div className="d-flex px-3 py-1">
            <div>
                <React.Fragment>
                    {inMonth ? (<div
                        className="me-3 animate__infinite  bg-success rounded-circle shadow-sm animate__animated animate__pulse d-flex align-items-center justify-content-center" style={{ width: "50px", height: "50px" }}>
                        <FontAwesomeIcon
                            className="text-white"
                            icon={faCartArrowDown} style={{ fontSize: "20px" }} />
                    </div>
                    ) : (
                        <div
                            className="me-3  bg-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: "50px", height: "50px" }}>
                            <FontAwesomeIcon
                                className="text-light"
                                icon={faCartPlus} style={{ fontSize: "20px" }} />
                        </div>
                    )}
                </React.Fragment>
            </div>
            <div className="d-flex flex-column justify-content-center">
                <h6 className="mb-0 text-sm">{name}</h6>
                <p className="text-sm font-weight-normal text-secondary mb-0">
                    <span
                        className={`text-${expense - paidOut === 0 ? "success" : "danger"
                            } font-weight-bold mx-1`}
                    >
                        {currencyFormat(expense - paidOut)}
                    </span>
                    {category}
                </p>
            </div>
        </div>
    )
}

export default DTProfileTable