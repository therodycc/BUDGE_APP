import React, { FC } from 'react'
import { currencyFormat } from '../../../helpers/currency.helper'
export interface DTProfileTablePropsI {
    name: string
    image: string
    expense: number
    paidOut: number
    category: string
}
const DTProfileTable: FC<DTProfileTablePropsI> = ({ category, expense, image, name, paidOut }) => {
    return (
        <div className="d-flex px-3 py-1">
            <div>
                <img
                    src={
                        image ||
                        "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/blue-shoe.jpg "
                    }
                    className="avatar me-3"
                    alt="image"
                />
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