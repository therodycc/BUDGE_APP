import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC } from 'react';
import { gxUUID } from '../../../helpers/uuid-generator.helper';
export interface ButtonGroupPropsI {
    buttonsGroupsData: ButtonGroupI[];
}
export interface ButtonGroupI {
    bgClass: string,
    icon: IconDefinition,
    action: Function
}
let uuidGX = gxUUID();
const ButtonGroup: FC<ButtonGroupPropsI> = ({ buttonsGroupsData }) => {
    return (
        <React.Fragment>
            <div className="btn-group">
                {buttonsGroupsData?.map((item, i) => (
                    <button
                        key={uuidGX + i}
                        type="button"
                        className={`btn btn-${item?.bgClass} btn-sm`}
                        onClick={() => item?.action()}
                    >
                        <FontAwesomeIcon icon={item?.icon} />
                    </button>
                ))}
            </div>
        </React.Fragment>
    )
}

export default ButtonGroup