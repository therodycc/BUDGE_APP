import { InputPropsI } from "../../interfaces/common/input/input.interface"

export const inputsAuthRenderSettings = (form: any): InputPropsI[] => {
    return [
        {
            title: "Email",
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
            props: {
                type: "password",
                name: "password",
                placeholder: "Your Password",
                value: form?.password,
            }
        },
    ]
}

export const inputsAuthRenderRules = () => {
    return {
        email: {
            isRequired: { message: "The Email is required" },
        },
        password: {
            isRequired: { message: "The Password is required" },
        },
    }
}

export default inputsAuthRenderSettings