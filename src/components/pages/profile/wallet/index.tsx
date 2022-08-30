import React from 'react'
import NotWorkingSection from '../../../common/not-working'

const Wallet = () => {
    return (
        <React.Fragment>
            <div className='card p-3 mt-3'>
                <NotWorkingSection />
                <span>Wallet</span>
                <div className='card-body row'>
                    <span>200,000.00</span>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Wallet