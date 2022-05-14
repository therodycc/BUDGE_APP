import { ChangeEvent, FC, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { isRequired } from '../../../../helpers/validations/index';
import { setFormData } from '../../../../redux/actions/auth/change-password';
import { changePasswordInputs } from '../../../../settings/profile/change-password-inputs.settings';
import Button from '../../../common/button';
import Input from '../../../common/input';


interface FormChangePasswordPropsI {
}
const FormChangePassword: FC<FormChangePasswordPropsI> = () => {
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


            <form className="p-3" onSubmit={handleSubmit}>
                <div className="row">
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
        </>
    )
}

export default FormChangePassword