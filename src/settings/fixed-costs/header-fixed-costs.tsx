import React from "react";
import Dropdown from "../../components/common/dropdown";
import DTProfileTable from "../../components/common/dt-profile-table";
import TrafficLights from "../../components/common/traffic-lights";
import CustomBtnGroups from "../../components/custom/btn-actions-groups";
import { currencyFormat } from "../../helpers/currency.helper";
import { headItemsFixedCostsI } from "../../interfaces/fixed-costs/fixed-costs.interface";
import { StatusType } from "../../interfaces/utility/utilily.type";
import { ChangeEvent } from 'react';
import ManageDays from "../../components/pages/fixed-costs/manage-days";
import Toggle from "../../components/common/input/toggle";

export const headItemsFixedCosts = ({
    addToThisMonth,
    showModalEdit,
    removeItem,
    disabledItem,
    changeDateToPay
}: headItemsFixedCostsI) => [
        {
            title: "Title",
            render: ({ item }: any) => { return (<DTProfileTable inMonth={item?.inMonth} name={item?.name} image={item?.img} expense={item?.expense} paidOut={item?.paidOut} category={item?.category} />); },

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
            title: "Day to pay",
            render: ({ item }: any) => {
                return (
                    <React.Fragment>
                        <ManageDays />
                        {/* <Dropdown
                            defaultValue={item.dateToPay}
                            name="dateToPay"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                changeDateToPay(item?.uuid, e.target.value)
                            }}
                            options={[
                                {
                                    title: "Dias 15",
                                    value: 15
                                },
                                {
                                    title: "Dias 30",
                                    value: 30
                                },
                            ]} /> */}
                    </React.Fragment>
                );
            },
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
                return (<Toggle checked={item.active} onChange={() => { disabledItem(item); }} />);
            },
        },
    ];