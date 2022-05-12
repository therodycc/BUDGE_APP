import React, { ChangeEvent, FormEvent, useState } from 'react'
import { changePasswordInputs } from '../../../../settings/profile/change-password-inputs.settings';
import Button from '../../../common/button'
import Input from '../../../common/input'

const FormChangePassword = () => {
    const [passwordError, setPasswordError] = useState("");
    const [newPasswordError, setNewPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

    const [form, setForm] = useState({
        password: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }
    return (
        <>
            <div className="card shadow-lg">
                <form className="p-3" onSubmit={handleSubmit}>
                    <h4>Change Password</h4>
                    <div className="row mt-3">
                        {
                            changePasswordInputs(form, { passwordError, newPasswordError, confirmPasswordError }).map(item => (
                                <div className={`${item.cols}} my-3`}>
                                    <Input
                                        name={`${item.name}`}
                                        onChange={handleChange}
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