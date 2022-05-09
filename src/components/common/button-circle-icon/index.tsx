import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { FC } from 'react'

interface ButtonCircleIconPropsI {
    icon: IconProp
    action: Function
}
const ButtonCircleIcon: FC<ButtonCircleIconPropsI> = ({ icon, action }) => {
    return (
        <>
            <div
                className="col-sm-auto col-4"
            >
                <div
                    className="bg-dark rounded-circle shadow-sm border border-light text-center  cursor-pointer"
                    style={{
                        width: "50px",
                        height: "50px",
                        lineHeight: "50px",
                    }}
                    onClick={() => action && action()}
                >
                    <FontAwesomeIcon begin="fa-solid" icon={icon} />
                </div>
            </div>
        </>
    )
}

export default ButtonCircleIcon