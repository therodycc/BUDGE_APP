export const inputsModalManage = (form: any, errors: any) => {

    return [
        {
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