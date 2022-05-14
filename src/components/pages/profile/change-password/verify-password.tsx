import React, { ChangeEvent, FC, useState } from 'react'
import Button from '../../../common/button'
import Modal from '../../../common/modal'
import Input from '../../../common/input/index';
import authProvider from '../../../../providers/auth/auth.provider';
import { DefaultRootState, useSelector } from 'react-redux';
interface VerifyPasswordPropsI {
    setToggle: Function
    show: boolean
}
const VerifyPassword: FC<VerifyPasswordPropsI> = ({ setToggle, show }) => {
    const [passwordError, setPasswordError] = useState("");
    const [form, setForm] = useState({ password: "" });

    const { changePassword: { form: formState } } = useSelector((state: any) => state)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        const result = await authProvider.changePassword({
            password: form.password,
            newPassword: formState?.newPassword
        })
        
        if (result.error) return setPasswordError(result.error.message);
    }
    return (
        <>
            {show &&

                <Modal
                    title="Verify Password"
                    setToggle={setToggle}>
                    <div className="card shadow-lg">
                        <form className="p-3" onSubmit={handleSubmit}>
                            <div className="row mt-3">
                                <Input
                                    onChange={handleChange}
                                    name={`password`}
                                    placeholder={``}
                                    type={`password`}
                                    value={form?.password}
                                    title={"Password"}
                                    errorMessage={passwordError}
                                />
                            </div>

                            <Button
                                type="submit"
                                bgClass="info"
                                customClass='w-100'
                                action={() => { }}
                                loading={false}
                            >
                                Confirm
                            </Button>
                        </form>
                    </div>
                </Modal>
            }
        </>
    )
}

export default VerifyPassword