import React, { ChangeEvent, FormEvent, useState } from 'react'
import authProvider from '../../../../providers/auth/auth.provider';
import { changePasswordInputs } from '../../../../settings/profile/change-password-inputs.settings';
import Button from '../../../common/button'
import Input from '../../../common/input'
import { isRequired } from '../../../../helpers/validations/index';
import { setFormData } from '../../../../redux/actions/auth/change-password';
import { useDispatch } from 'react-redux';

const FormChangePassword = () => {
    const dispatch = useDispatch()
    const [newPasswordError, setNewPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

    const [form, setForm] = useState({
        newPassword: '',
        confirmPassword: ''
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const errNewPassword = isRequired(form.newPassword, "New password is required", setNewPasswordError)
        const errConfirmPassword = isRequired(form.newPassword === form.confirmPassword, "Password do not match", setConfirmPasswordError)
        if (errNewPassword || errConfirmPassword) return
        dispatch(setFormData({ form }))

    }
    return (
        <>
            <div className="card shadow-lg">
                <form className="p-3" onSubmit={handleSubmit}>
                    <h4>Change Password</h4>
                    <div className="row mt-3">
                        {
                            changePasswordInputs(form, { newPasswordError, confirmPasswordError }).map(item => (
                                <div className={`${item.cols}} my-3`}>
                                    <Input
                                        onChange={handleChange}
                                        name={`${item.name}`}
                                        placeholder={`${item.placeholder}`}
                                        type={`${item.type}`}
                                        value={`${item.value}`}
                                        title={`${item.title}`}
                                        errorMessage={`${item.errors}`}
                                    />
                                </div>
                            ))
                        }
                    </div>

                    <Button
                        type="submit"
                        bgClass="info"
                        customClass='w-100'
                        action={() => { }}
                        loading={false}
                    >
                        Send
                    </Button>
                </form>
            </div>
        </>
    )
}

export default FormChangePassword