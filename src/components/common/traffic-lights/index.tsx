import React, { FC } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { StatusType } from '../../../interfaces/utility/utilily.type';
export interface TrafficLightsPropsI {
    status: StatusType
}
const TrafficLights: FC<TrafficLightsPropsI> = ({ status }) => {
    return (
        <React.Fragment>
            <div className="btn-group">
                {
                    TrafficLightsItems.map((item, index) => (
                        <React.Fragment key={index}>
                            <span className={`text-${item?.status === status ? getClassByStatus(status) : "light"} display-8 mx-1`} >
                                <FontAwesomeIcon icon={faCircle} />
                            </span>
                        </React.Fragment>
                    ))
                }
            </div>
        </React.Fragment>
    )
}
export const getClassByStatus = (status: StatusType) => ({
    PENDING: "danger",
    IN_PROGRESS: "warning",
    COMPLETED: "success",
}?.[status])

export const TrafficLightsItems = [{ status: "PENDING", }, { status: "IN_PROGRESS", }, { status: "COMPLETED", }]


export default TrafficLights