export const inputsModalManage = (form: any, errors: any) => {

    return [
        {
            errorMessage: errors?.paidOutErrors,
            title: "To pay",
            cols: "col-lg-12",
            props: {
                type: "text",
                name: "paidOut",
                value: form?.paidOut
            },
        },
    ]
}