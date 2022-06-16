import DTProfileTable from "../../components/common/dt-profile-table";
import TrafficLights from "../../components/common/traffic-lights";
import CustomBtnGroups from "../../components/custom/btn-actions-groups";
import { currencyFormat } from "../../helpers/currency.helper";
import { StatusType } from "../../interfaces/utility/utilily.type";
import { headItemsVolunteerThingsI } from "../../interfaces/volunteer-things/volunteer-things.interface";

export const headersVolunteerThings = ({ addToThisMonth, showModalEdit, removeItem }: headItemsVolunteerThingsI) => [
    {
        title: "Title",
        render: ({ item }: any) => { return (<DTProfileTable name={item?.name} image={item?.img} expense={item?.expense} paidOut={item?.paidOut} category={item?.category} />); },

    },
    {
        title: "Expense",
        render: ({ item }: any) => {
            return (
                <>
                    <span>{currencyFormat(item.expense)}</span>
                </>
            );
        },
    },
    {
        title: "To",
        render: ({ item }: any) => {
            return (
                <div>
                    <span>{item?.to}</span>
                </div>
            );
        },
    },
    {
        title: "Status",
        render: ({ item }: any) => { return (<TrafficLights status={item.status as StatusType} />); },
    },
    {
        title: "Actions",
        render: ({ item }: any) => {
            return (<CustomBtnGroups action1={() => { addToThisMonth(item); }} action2={() => { showModalEdit(item) }} action3={() => { removeItem(item); }} />);
        },
    },
]