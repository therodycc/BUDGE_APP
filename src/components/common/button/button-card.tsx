import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FC } from 'react'
import { ButtonCardPropsI } from '../../../interfaces/common/button/button.interface'

const ButtonCard: FC<ButtonCardPropsI> = ({ title, icon, bgClass, action }) => {
    return (
        <>
            <div className="card shadow cursor-pointer mb-2 card-person" onClick={() => action()}>
                <div className="card-body p-3">
                    <div className=" d-flex align-items-center justify-content-center ">
                        <div className={`rounded-circle text-white text-center bg-${bgClass} me-3 icon-rounded`} >
                            <FontAwesomeIcon icon={icon} />
                        </div>
                        <span>{title}</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ButtonCard