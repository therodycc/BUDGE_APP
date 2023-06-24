import React, { FC, useState } from 'react'
interface BackModalPropsI {
    toggle: Function
}
const BackModal: FC<BackModalPropsI> = ({ children, toggle }) => {
    const [animation, setAnimation] = useState(false);

    const handleClose = () => {
        setAnimation(true);
        setTimeout(() => {
            toggle();
            setAnimation(false);
        }, 400);
    }

    return (
        <div style={{ zIndex: 9, }} >
            <div
                onClick={handleClose}
                className={`animate__animated animate__fadeIn ${animation && 'animate__fadeOut'}`}
                style={{
                    position: "fixed",
                    top: "0",
                    left: "0",
                    width: "100%",
                    height: "100vh",
                    animationDuration: "400ms",
                    backgroundColor: "rgba(0,0,0,0.5)",
                }} />
            {children}
        </div>
    )
}

export default BackModal