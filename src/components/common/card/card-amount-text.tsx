import React, { FC } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTeeth } from '@fortawesome/free-solid-svg-icons';
interface CardAmountTextPropsI {
    title: string
    description: string
}
const CardAmountText: FC<CardAmountTextPropsI> = ({ title, description }) => {
    return (
        <React.Fragment>
            <h5 className="font-weight-bold d-flex justify-content-between p-3 py-4 rounded-3 shadow" >
                <div className="d-flex align-items-center justify-content-center bg-danger">
                    <FontAwesomeIcon icon={faTeeth} />
                    <span className="text-dark">{title}</span>
                </div>
                <span className="text-body">{description}</span>
            </h5>
        </React.Fragment>
    )
}

export default CardAmountText