export const changePasswordInputs = (form: any, errors: any) => {
    return [
        {
            title: "New password",
            name: "newPassword",
            cols: "col-md-12",
            value: form?.newPassword,
            type: "password",
            placeholder: "",
            errors: errors.newPasswordError
        },
        {
            title: "Confirm new password",
            name: "confirmPassword",
            cols: "col-md-12",
            value: form?.confirmPassword,
            type: "password",
            placeholder: "",
            errors: errors.confirmPasswordError
        }
    ]
}