import { InputPropsI } from "../../interfaces/common/input/input.interface"

export const inputsAuthRenderSettings = (form: any, errors: any): InputPropsI[] => {
    return [
        {
            title: "Email",
            errorMessage: errors.emailError,
            cols: "col-md-12",
            props: {
                type: "text",
                name: "email",
                placeholder: "E.g. Mars@gmail.com",
                value: form?.email,
            }
        },
        {
            title: "Password",
            cols: "col-md-12",
            errorMessage: errors.passwordError,
            props: {
                type: "password",
                name: "password",
                placeholder: "Your Password",
                value: form?.password,
            }
        },
    ]
}

export default inputsAuthRenderSettings