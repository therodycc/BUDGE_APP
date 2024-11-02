import React from "react";
import DTProfileTable from "../../components/common/dt-profile-table";
import TrafficLights from "../../components/common/traffic-lights";
import CustomBtnGroups from "../../components/custom/btn-actions-groups";
import { currencyFormat } from "../../helpers/currency.helper";
import { headItemsDebtsI } from "../../interfaces/debts/debts.interface";
import { StatusType } from "../../interfaces/utility/utilily.type";

export const headTableDebts = ({ addToThisMonth, showModalEdit, removeItem }: headItemsDebtsI) => [
    {
        title: "Title",
        render: ({ item }: any) => {
            return (<DTProfileTable
                inMonth={item?.inMonth}
                name={item?.name}
                image={item?.img}
                expense={item?.expense}
                paidOut={item?.paidOut}
                category={item?.category}
            />);
        },

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
        title: "Status",
        render: ({ item }: any) => {
            console.log(item)
            return (<div>{new Date(item?.createdAt).toDateString()}</div>);
        },
    },
    {
        title: "Actions",
        render: ({ item }: any) => {
            return (<CustomBtnGroups action1={() => { addToThisMonth(item); }} action2={() => { showModalEdit(item) }} action3={() => { removeItem(item); }} />);
        },
    },
]