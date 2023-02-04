import { ReactElement } from "react";
import AuthLayout from "../../../components/layout/auth-layout";
import SignIn from "../../../components/pages/auth/sign-in";

const SignInPage = () => {
    return <SignIn />
};

SignInPage.getLayout = (page: ReactElement) => (
    <AuthLayout>
        {page}
    </AuthLayout>
)

export default SignInPage;
