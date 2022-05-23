import router from 'next/router';
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux';
import sweetAlert from '../../../../helpers/alerts/sweetAlert.helper';
import { isRequired } from '../../../../helpers/validations';
import authProvider from '../../../../providers/auth/auth.provider';
import { login } from '../../../../redux/actions/auth/auth.action';
import inputsAuthRenderSettings from '../../../../settings/auth/inputs-auth-render.settings';
import Button from '../../../common/button';
import HeadImages from '../../../common/head-images';
import Input from '../../../common/input';

const SignIn = () => {
    const dispatch = useDispatch()
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [loadingAuth, setLoadingAuth] = useState<boolean>(false);

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e: FormEvent) => {
        setLoadingAuth(true)
        e.preventDefault();
        const errEmail = isRequired(form.email, "Email is required", setEmailError);
        const errPassword = isRequired(form.password, "Password is required", setPasswordError);

        if (errEmail || errPassword) return

        const res = await authProvider.signIn(form)
        if (res.error) return [sweetAlert.toast('Error', res?.error?.message, 'error'), setLoadingAuth(false)]
        router.push("/")
        dispatch(login({ email: "Therodycc@gmail.com" }))
        setLoadingAuth(false)
    };

    return (
        <>
            <div className="col-lg-12 m-auto">
                <div className="col-lg-4 mx-auto">
                    <div className="card mx-3" style={{ zIndex: 1 }}>
                        <div className="card-header text-center py-0">
                            <HeadImages />
                        </div>
                        <div className="card-body ">
                            <p className="mb-4 text-center">Enter password to unlock your account.</p>
                            <form onSubmit={handleSubmit}>
                                {
                                    inputsAuthRenderSettings(form, { emailError, passwordError }).map((item, index) => (
                                        <div
                                            key={`input-auth-${index}`}
                                            className={`my-3 ${item.cols}`}>
                                            <Input {...item.props} {...item} onChange={handleChange} disabled={loadingAuth} />
                                        </div>
                                    ))
                                }

                                <div>
                                    <Button
                                        bgClass={"primary"}
                                        type={"submit"}
                                        loading={loadingAuth}
                                        customClass="mt-3 w-100"
                                    >
                                        Log In
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignIn