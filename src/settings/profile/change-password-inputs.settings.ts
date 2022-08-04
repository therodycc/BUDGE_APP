import { InputPropsI } from "../../interfaces/common/input/input.interface"

export const changePasswordInputs = (form: any, errors: any): InputPropsI[] => {
    return [
        {
            title: "New password",
            cols: "col-md-12",
            props: {
                name: "newPassword",
                value: form?.newPassword,
                type: "password",
                placeholder: "",
            }
        },
        {
            title: "Confirm new password",
            cols: "col-md-12",
            props: {
                name: "confirmPassword",
                value: form?.confirmPassword,
                type: "password",
                placeholder: "",
            }
        }
    ]
}