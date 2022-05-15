import React from 'react'

const LoadingPoints = () => {
    return (
        <>
            <div className="w-100 h-100 d-flex align-items-center justify-content-center bg-white overflow-hidden">
                <div className="spinner-points">
                    <div className="bounce1"></div>
                    <div className="bounce2"></div>
                    <div className="bounce3"></div>
                </div>
            </div>
        </>
    )
}

export default LoadingPoints