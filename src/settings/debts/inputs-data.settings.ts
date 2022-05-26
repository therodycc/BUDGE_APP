import { InputPropsI } from "../../interfaces/common/input/input.interface"
import { statusOptions } from "../drops-downs-items/status.options"
import { urgencyOptions } from "../drops-downs-items/urgency.options"
interface EntriesDataI {
    form: any
    errors: any
    dropDowns: any
}
export const inputsDataDebtsModal = ({ form, errors, dropDowns }: EntriesDataI): InputPropsI[] => {
    return [
        {
            errorMessage: errors?.errName,
            title: "Name",
            cols: "col-lg-6",
            props: {
                type: "text",
                name: "name",
                value: form?.name,
                placeholder: "Your Name",
            }
        },

        {
            title: "Expense",
            cols: "col-lg-6",
            errorMessage: errors?.errExpense,
            props: {
                type: "number",
                name: "expense",
                value: form?.expense,
                placeholder: "The expense here"
            },
        },
        {
            title: "Category",
            cols: "col-lg-6",
            errorMessage: errors?.errCategory,
            props: {
                type: "text",
                name: "category",
                value: form?.category,
                placeholder: "Your category"
            },
        },
        {
            title: "Paid Out",
            cols: "col-lg-6",
            errorMessage: errors?.errPaidOut,
            props: {
                type: "number",
                name: "paidOut",
                value: form?.paidOut,
                placeholder: "Amount to pay"
            },
        },
        {
            title: "Status",
            cols: "col-lg-6",
            errorMessage: errors?.errStatus,
            options: statusOptions,
            props: {
                type: "dropdown",
                name: "status",
                value: form?.status,
            },
        },

        {
            title: "Urgency",
            cols: "col-lg-6",
            errorMessage: errors?.errUrgency,
            options: urgencyOptions,
            props: {
                type: "dropdown",
                name: "urgency",
                value: form?.urgency,
            },
        },

        {
            title: "Description",
            cols: "",
            errorMessage: errors?.errPaidOut,
            props: {
                type: "text",
                name: "description",
                value: form?.description,
                placeholder: "Write a description"
            },
        },
        {
            title: "To whom",
            cols: "",
            errorMessage: errors?.errPaidOut,
            props: {
                type: "text",
                name: "to",
                value: form?.to,
                placeholder: "E.g. To the neighbor"
            },
        },
    ]
}
