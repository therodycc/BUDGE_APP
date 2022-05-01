
export const inputsAuthRenderSettings = (form: any, errors: any) => {
    return [
        {
            title: "Email",
            name: "email",
            cols: "col-md-12",
            value: form?.email,
            type: "text",
            placeholder: "E.g. Mars@gmail.com",
            errors: errors.emailError
        },
        {
            title: "Password",
            name: "password",
            cols: "col-md-12",
            value: form?.password,
            type: "password",
            placeholder: "Your Password",
            errors: errors.passwordError
        }
    ]
}

export default inputsAuthRenderSettings