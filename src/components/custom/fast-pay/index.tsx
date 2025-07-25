import { faFireFlameCurved } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { FC, useCallback } from 'react'
import { TypeTable } from '../../../interfaces/utility/utilily.type'
import { payAction } from '../../../redux-toolkit/slices/manage/manage.actions'
import { useDispatch } from '../../../redux-toolkit/store'
import { RccButton } from 'rcc-react-lib'

interface FastPayButtonProps {
    paidOut: number
    type: TypeTable
    uuid: string,
}

const FastPayButton: FC<FastPayButtonProps> = ({ paidOut, type, uuid }) => {
    const dispatch = useDispatch()

    const handlePay = useCallback(() => {
        dispatch(payAction({ paidOut, type, uuid }))
    }, [dispatch, paidOut, type, uuid])

    return (
        <React.Fragment>
            <RccButton bgClass={"info"} type={"button"} loading={false} action={handlePay} >
                <FontAwesomeIcon className="cursor-pointer" icon={faFireFlameCurved} />
            </RccButton>
        </React.Fragment>
    )
}

export default FastPayButton