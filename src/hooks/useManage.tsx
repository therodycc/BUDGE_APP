import { useMemo } from "react";

const useManage = (manage: any, profits: any, entry: any) => {
    let statists = useMemo(() => {
        return {
            pending: manage?.reduce((acc: number, item: any) => {
                acc += item.expense - item.paidOut;
                return acc;
            }, 0),
            debt: manage?.reduce((acc: number, item: any) => {
                if (item.category === "debt") {
                    acc += item.expense;
                }
                return acc;
            }, 0),
            paidOut: manage?.reduce((acc: number, item: any) => {
                acc += item.paidOut;
                return acc;
            }, 0),
            fixedCosts: manage?.reduce((acc: number, item: any) => {
                if (item.category === "fixedCosts") {
                    acc += item.expense;
                }
                return acc;
            }, 0),
            personal: manage?.reduce((acc: number, item: any) => {
                if (item.category === "personal") {
                    acc += item.expense;
                }
                return acc;
            }, 0),
            family: manage?.reduce((acc: number, item: any) => {
                if (item.category === "family") {
                    acc += item.expense;
                }
                return acc;
            }, 0),
            voluntary: manage?.reduce((acc: number, item: any) => {
                if (item.category === "voluntary") {
                    acc += item.expense;
                }
                return acc;
            }, 0),
            remaining: manage?.reduce((acc: number, item: any) => {
                acc -= item.expense;
                return acc;
            }, entry),
            wishes: manage?.reduce((acc: number, item: any) => {
                if (item.category === "wishes") {
                    acc += item.expense;
                }
                return acc;
            }, 0),
        }

    }, [manage, profits, entry])
    return { ...statists, entry }
};

export default useManage;
