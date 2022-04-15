import { ReactElement } from "react"
import AuthLayout from "../../../components/layout/auth-layout"

const SignUp = () => {
    return (
        <>
            <h1>Here is the signup</h1>
        </>
    )
}
SignUp.getLayout = function getLayout(page: ReactElement) {
    return (
        <AuthLayout>
            {page}
        </AuthLayout >
    )
}
export default SignUp