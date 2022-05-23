import { InputPropsI } from "../../interfaces/common/input/input.interface"
interface EntriesDataI {
    form: any
    errors: any
}
export const inputsDataProfitsModal = ({ form, errors }: EntriesDataI): InputPropsI[] => {
    return [
        {
            errorMessage: errors?.errName,
            title: "Type",
            cols: "col-lg-6",
            props: {
                type: "text",
                name: "type",
                value: form?.type,
                placeholder: "Type",
            }
        },

        {
            title: "Amount",
            cols: "col-lg-6",
            errorMessage: errors?.errAmount,
            props: {
                type: "number",
                name: "amount",
                value: form?.amount,
                placeholder: "The amount here"
            },
        },
    ]
}
