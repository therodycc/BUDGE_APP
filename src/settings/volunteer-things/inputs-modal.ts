import { InputPropsI } from "../../interfaces/common/input/input.interface";
import { statusOptions } from "../drops-downs-items/status.options";
import { urgencyOptions } from "../drops-downs-items/urgency.options";

interface EntriesDataI {
    form: any
    errors: any
    dropDowns: any
}
export const inputsModalVolunteerThings = ({ errors, form, dropDowns }: EntriesDataI): InputPropsI[] => [
    {
        errorMessage: errors?.nameError,
        title: "Name",
        cols: "col-lg-6",
        props: {
            type: "text",
            name: "name",
            value: form?.name
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
        title: "Image",
        cols: "",
        errorMessage: errors?.errPaidOut,
        props: {
            type: "text",
            name: "image",
            value: form?.image,
            placeholder: "The image goes here"
        },
    },
    {
        title: "To (Person or Group)",
        cols: "",
        errorMessage: errors?.errPaidOut,
        props: {
            type: "text",
            name: "to",
            value: form?.to,
            placeholder: "E.g. Church"
        },
    },
] 