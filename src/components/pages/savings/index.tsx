import React from 'react'
import { currencyFormat } from '../../../helpers/currency.helper'
import CardHome from '../../common/card/CardHome'

const Savings = () => {
    return (
        <>
            <div className="col-lg-6">
                <CardHome
                    subtitle={currencyFormat(0)}
                    title={currencyFormat(0)}
                    description={""}
                />
            </div>
        </>
    )
}

export default Savings