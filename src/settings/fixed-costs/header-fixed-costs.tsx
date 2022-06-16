import DTProfileTable from "../../components/common/dt-profile-table";
import TrafficLights from "../../components/common/traffic-lights";
import CustomBtnGroups from "../../components/custom/btn-actions-groups";
import { currencyFormat } from "../../helpers/currency.helper";
import { headItemsFixedCostsI } from "../../interfaces/fixed-costs/fixed-costs.interface";
import { StatusType } from "../../interfaces/utility/utilily.type";

export const headItemsFixedCosts = ({ addToThisMonth, showModalEdit, removeItem, disabledItem }: headItemsFixedCostsI) => [
    {
        title: "Title",
        render: ({ item }: any) => { return (<DTProfileTable name={item?.name} image={item?.img} expense={item?.expense} paidOut={item?.paidOut} category={item?.category} />); },

    },
    {
        title: "Expense",
        render: ({ item }: any) => { return (<span>{currencyFormat(item.expense)}</span>); },
    },
    {
        title: "Status",
        render: ({ item }: any) => { return (<TrafficLights status={item.status as StatusType} />); },
    },
    {
        title: "Actions",
        render: ({ item }: any) => {
            return (<CustomBtnGroups
                action1={() => { addToThisMonth(item); }}
                action2={() => { showModalEdit(item) }}
                action3={() => { removeItem(item); }} />);
        },
    },
    {
        title: "Active",
        render: ({ item }: any) => {
            return (
                <>
                    <div className="form-check form-switch ms-2 my-auto is-filled">
                        <input
                            onClick={() => {
                                disabledItem(item);
                            }}
                            className="form-check-input"
                            type="checkbox"
                            defaultChecked={item.active}
                        />
                    </div>
                </>
            );
        },
    },
];