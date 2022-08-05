import React, { FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { ChangePasswordPropsI } from '../../../../interfaces/change-password/change-password.interface'
import Modal from '../../../common/modal'
import FormChangePassword from './form'
import VerifyPassword from './verify-password'
import { setFormData } from '../../../../redux/actions/auth/change-password';

const ChangePassword: FC<ChangePasswordPropsI> = ({ setToggle, active }) => {
    const [step, setStep] = useState(1);
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(setFormData({ form: {} }))
        }
    }, []);

    return (
        <>
            <Modal
                title={"Change Password"}
                setToggle={setToggle}
                modalStylesContainer={{
                    maxWidth: "350px",
                }}
                active={active}>
                {step === 1 && <FormChangePassword setStep={setStep} />}
                {step === 2 && <VerifyPassword setToggle={setToggle} />}
            </Modal>
        </>
    )
}

export default ChangePassword