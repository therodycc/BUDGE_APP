import { faPlusCircle, faSpinner, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import React, { FC } from 'react'
import ButtonGroup, { ButtonGroupI } from '../../common/button/button-group'

export interface CustomBtnGroupsPropsI { action1: Function, action2: Function, action3: Function }

const CustomBtnGroups: FC<CustomBtnGroupsPropsI> = ({ action1, action2, action3 }) => {
    return (
        <React.Fragment>
            <ButtonGroup buttonsGroupsData={ButtonGroupData({ action1, action2, action3 })} />
        </React.Fragment>
    )
}

export default CustomBtnGroups

const ButtonGroupData = ({ action1, action2, action3 }: CustomBtnGroupsPropsI): ButtonGroupI[] => [
    {
        bgClass: 'success',
        icon: faPlusCircle,
        action: () => { action1?.() }
    },
    {
        bgClass: 'secondary',
        icon: faSpinner,
        action: () => { action2?.() }
    },
    {
        bgClass: 'light',
        icon: faTrashAlt,
        action: () => { action3?.() }
    }
]