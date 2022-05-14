import React, { FC, useState } from 'react'
import Modal from '../../../common/modal'
import FormChangePassword from './form'
import VerifyPassword from './verify-password'

interface ChangePasswordPropsI {
    toggle: Function
}
const ChangePassword: FC<ChangePasswordPropsI> = ({ toggle }) => {
    const [step, setStep] = useState(1);
    return (
        <>
            <Modal
                title={"Change Password"}
                setToggle={toggle}>
                {step === 1 && <FormChangePassword />}
                {step === 2 && <VerifyPassword />}
            </Modal>
        </>
    )
}

export default ChangePassword