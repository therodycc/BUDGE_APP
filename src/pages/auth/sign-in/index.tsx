import { FormEvent, ReactElement } from "react";
import { useDispatch } from "react-redux";
import Button from "../../../components/common/button";
import InputText from "../../../components/common/input";
import AuthLayout from "../../../components/layout/auth-layout";
import { login } from "../../../redux/actions/auth.action";

const SignIn = () => {
    const dispatch = useDispatch()

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        dispatch(login({ email: "Therodycc@gmail.com" }))
    };
    return (
        <>
            <div className="col-lg-12 m-auto">
                <div className="col-lg-4 mx-auto">
                    <div className="card mx-3" style={{ zIndex: 1 }}>
                        <div className="card-header text-center py-0">
                            <div className="mt-n5">
                                <img
                                    className="avatar avatar-xxl shadow-lg"
                                    alt="Image placeholder"
                                    src="https://www.w3schools.com/howto/img_avatar.png"
                                />
                            </div>
                        </div>
                        <div className="card-body text-center">
                            <p className="mb-4">Enter password to unlock your account.</p>
                            <form onSubmit={handleSubmit}>
                                <div className="my-3">
                                    <InputText
                                        type="text"
                                        name="email"
                                        placeholder={"E.g. Mars@gmail.com"}
                                    />
                                </div>
                                <div className="my-3">
                                    <InputText
                                        type="password"
                                        name="password"
                                        placeholder={"Your password"}
                                    />
                                </div>
                                <div>
                                    <Button
                                        action={() => { }}
                                        bgClass={"success"}
                                        type={"submit"}
                                        loading={false}
                                        size="sm"
                                        customClass="mt-3"
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
};
SignIn.getLayout = function getLayout(page: ReactElement) {
    return (
        <AuthLayout>
            {page}
        </AuthLayout >
    )
}
export default SignIn;
