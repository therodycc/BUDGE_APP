import React from 'react'
import { FormColumnPropsI } from '../../../interfaces/common/form-column/form-column.interface'

const FormColumn = ({ topSection, bottomSection }: FormColumnPropsI) => {
    return (
        <>
            <div className='col-lg-12 my-3'>
                <div className='col-lg-12 d-flex '>
                    {topSection}
                </div>
                <div className='col-lg-12'>
                    {bottomSection}
                </div>
            </div>
        </>
    )
}

export default FormColumn