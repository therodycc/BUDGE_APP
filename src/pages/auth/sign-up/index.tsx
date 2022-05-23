import { ReactElement } from "react";
import AuthLayout from "../../../components/layout/auth-layout";
import SignUp from "../../../components/pages/auth/sign-up";

const SignUpPage = () => {
    return <SignUp />
}
SignUpPage.getLayout = (page: ReactElement) => (
    <AuthLayout>
        {page}
    </AuthLayout >
)
export default SignUpPage