import { faFireFlameCurved } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { FC, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { TypeTable } from '../../../interfaces/utility/utilily.type'
import { PayAction } from '../../../redux-toolkit/actions/manage.actions'
import Button from '../../common/button'

interface FastPayButtonProps {
    paidOut: number
    type: TypeTable
    uuid: string,
}

const FastPayButton: FC<FastPayButtonProps> = ({ paidOut, type, uuid }) => {
    const dispatch = useDispatch()

    const handlePay = useCallback(() => {
        dispatch(PayAction({ paidOut, type, uuid }) as any)
    }, [dispatch, paidOut, type, uuid])

    return (
        <React.Fragment>
            <Button bgClass={"info"} type={"button"} loading={false} action={handlePay} >
                <FontAwesomeIcon className="cursor-pointer" icon={faFireFlameCurved} />
            </Button>
        </React.Fragment>
    )
}

export default FastPayButton