import React, { FC } from 'react'

const SimpleLayout: FC = ({ children }) => {
    return (
        <React.Fragment>
            <div className="position-relative">
                <svg
                    style={{
                        position: "absolute",
                        left: 0,
                        top: -200,
                        opacity: 0.1,
                        height: "100%",
                        transform: "rotate(180deg)",
                    }}
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path
                        fill="#0099ff"
                        fill-opacity="1"
                        d="M0,320L80,304C160,288,320,256,480,218.7C640,181,800,139,960,106.7C1120,75,1280,53,1360,42.7L1440,32L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
                    ></path>
                </svg>
                {children}
            </div>
        </React.Fragment>
    )
}

export default SimpleLayout