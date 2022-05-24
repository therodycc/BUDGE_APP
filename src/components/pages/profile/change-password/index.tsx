import React, { FC, useState } from 'react'
import { ChangePasswordPropsI } from '../../../../interfaces/change-password/change-password.interface'
import Modal from '../../../common/modal'
import FormChangePassword from './form'
import VerifyPassword from './verify-password'

const ChangePassword: FC<ChangePasswordPropsI> = ({ setToggle, active }) => {
    const [step, setStep] = useState(1);
    return (
        <>
            <Modal
                title={"Change Password"}
                setToggle={setToggle}
                active={active}>
                {step === 1 && <FormChangePassword />}
                {step === 2 && <VerifyPassword />}
            </Modal>
        </>
    )
}

export default ChangePassword