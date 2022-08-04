import router from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import sweetAlert from "../../../../helpers/alerts/sweetAlert.helper";
import authProvider from "../../../../providers/auth/auth.provider";
import { login } from "../../../../redux/actions/auth/auth.action";
import inputsAuthRenderSettings, { inputsAuthRenderRules } from "../../../../settings/auth/inputs-auth-render.settings";
import Button from "../../../common/button";
import Form from "../../../common/form";
import HeadImages from "../../../common/head-images";

const SignIn = () => {
    const dispatch = useDispatch();

    const [loadingAuth, setLoadingAuth] = useState<boolean>(false);

    const handleSubmit = async (form: any) => {
        setLoadingAuth(true);
        const res = await authProvider.signIn(form);
        if (res?.error) return [
            sweetAlert.toast("Error", res?.error?.message, "error"),
            setLoadingAuth(false)
        ];
        router.push("/");
        dispatch(login({ auth: true }));
        setLoadingAuth(false);
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
                            <p className="mb-4 text-center">
                                Enter password to unlock your account.
                            </p>

                            <Form
                                dataRules={inputsAuthRenderRules()}
                                keyForm="sign-in"
                                inputsData={inputsAuthRenderSettings}
                                handleSubmit={handleSubmit}
                                footerSection={
                                    <>
                                        <Button
                                            bgClass={"primary"}
                                            type={"submit"}
                                            loading={loadingAuth}
                                            customClass="mt-3 w-100"
                                        >
                                            Log In
                                        </Button>
                                    </>
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignIn;
