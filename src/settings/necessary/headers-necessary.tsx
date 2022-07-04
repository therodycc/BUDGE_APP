import React from "react";
import DTProfileTable from "../../components/common/dt-profile-table";
import TrafficLights from "../../components/common/traffic-lights";
import CustomBtnGroups from "../../components/custom/btn-actions-groups";
import { currencyFormat } from "../../helpers/currency.helper";
import { headItemsNecessaryI } from "../../interfaces/necessary/necessary.interface";
import { StatusType } from "../../interfaces/utility/utilily.type";

export const headersModalNecessary = ({ addToThisMonth, showModalEdit, removeItem }: headItemsNecessaryI) => [
    {
        title: "Title",
        render: ({ item }: any) => { return (<DTProfileTable inMonth={item?.inMonth} name={item?.name} image={item?.img} expense={item?.expense} paidOut={item?.paidOut} category={item?.category} />); },
    },
    {
        title: "Expense",
        render: ({ item }: any) => {
            return (
                <React.Fragment>
                    <span>{currencyFormat(item.expense)}</span>
                </React.Fragment>
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
