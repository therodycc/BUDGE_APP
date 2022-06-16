import React from 'react'
import Input from '../../common/input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const PayItemOn = () => {
    let toPay: number = 0;

    const handleChange = (value: string) => {
        toPay = parseInt(value)
    }

    const handleClickToPay = () => {
        // if (toPay > item?.expense) {
        //     return sweetAlert.alert('', 'La cantidad sobrepasa el valor', 'error');
        // }
        // manageProvider.update(item?.id, {
        //     paidOut: item?.paidOut + toPay
        // })
        //     .then(data => {
        //         sweetAlert.alert('Done!', '', 'success');
        //     })
        //     .catch(error => error)
    }

    return (
        <>
            <div className='row'>
                <div className='col-md-8'>

                    <Input
                        placeholder='To pay'
                        onChange={(e: any) => { handleChange(e.target.value) }}
                        type='number'
                    />
                </div>
                <div className='col-md-4'>
                    <button
                        className='btn btn-success btn-sm'
                        onClick={() => { handleClickToPay() }}
                    >
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                </div>
            </div>
        </>
    )
}

export default PayItemOn