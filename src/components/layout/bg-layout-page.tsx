import React, { FC } from 'react'

const BgLayoutPage: FC = ({ children }) => {
    return (
        <>
            <div className="container-fluid px-2 px-md-4">
                <div
                    className="page-header min-height-300 border-radius-xl mt-4"
                    style={{ backgroundImage: "url(/assets/images/bg-profile.jfif)", }}
                >
                    <span className="mask  bg-gradient-info  opacity-4"></span>
                </div>
                <div> {children} </div>
            </div>

        </>
    )
}

export default BgLayoutPage