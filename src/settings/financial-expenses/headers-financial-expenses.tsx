import DTProfileTable from "../../components/common/dt-profile-table";
import TrafficLights from "../../components/common/traffic-lights";
import { currencyFormat } from "../../helpers/currency.helper";
import { StatusType } from "../../interfaces/utility/utilily.type";

export const headTableFinancialExpenses = () => [
    {
        title: "Title",
        render: ({ item }: any) => {
            return (
                <DTProfileTable
                    inMonth={item?.inMonth}
                    name={item?.name}
                    image={item?.img}
                    expense={item?.expense}
                    paidOut={item?.paidOut}
                    category={item?.category}
                />

            );
        },

    },
    {
        title: "Expense",
        render: ({ item }: any) => {
            return (
                <span>{currencyFormat(item.expense)}</span>
            );
        },
    },
    {
        title: "Description",
        render: ({ item }: any) => {
            return (
                <div style={{ whiteSpace: "pre-wrap", fontSize: "12px", color: "gray", fontWeight: "bold" }}>
                    <span >{item.description}</span>
                </div>
            );
        },
    },
    {
        title: "To Whom",
        render: ({ item }: any) => {
            return (
                <>
                    <span>{item.to}</span>
                </>
            );
        },
    },
    {
        title: "Status",
        render: ({ item }: any) => { return (<TrafficLights status={item.status as StatusType} />); },
    },
    {
        title: "Actions"
    },
]