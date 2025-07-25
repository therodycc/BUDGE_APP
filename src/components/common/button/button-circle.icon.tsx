import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FC } from 'react'
import { ButtonCircleIconPropsI } from '../../../interfaces/common/button/button.interface'

const ButtonCircleIcon: FC<ButtonCircleIconPropsI> = ({ icon, action }) => {
    return (
        <>
            <div className="col-sm-auto col-4" >
                <div
                    className="bg-dark rounded-circle shadow-sm border border-light text-center  cursor-pointer"
                    style={{ width: "40px", height: "40px", lineHeight: "40px", }}
                    onClick={() => action?.()}
                >
                    <FontAwesomeIcon begin="fa-solid" icon={icon} />
                </div>
            </div>
        </>
    )
}

export default ButtonCircleIcon