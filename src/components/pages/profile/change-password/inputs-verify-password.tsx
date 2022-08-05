
export const inputsChangePassword = ({ form }: any) => {
    return [
        {
            title: "Password",
            cols: "col-md-12",
            props: {
                type: "password",
                name: "password",
                placeholder: "Your password",
                value: form?.email,
            }
        }
    ]
}