import React from 'react'

const NotWorkingSection = () => {
    return (
        <React.Fragment>
            <div
                className='w-100 h-100 rounded position-absolute d-flex justify-content-center align-items-center'
                style={{ fontSize: '.8rem', fontWeight: "700", backgroundColor: 'rgba(255, 87, 51,.3)', top: 0, left: 0, right: 0, bottom: 0 }}
            >
                <span  className="p-2 py-1 rounded-pill" style={{ fontSize: '.8rem', background: 'white' }}> Not Working</span>
            </div>
        </React.Fragment>
    )
}

export default NotWorkingSection