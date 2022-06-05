import sweetAlert from "../../helpers/alerts/sweetAlert.helper";
import { DebtsI } from "../../interfaces/debts/debts.interface";
import debtProvider from "../../providers/debt/debt.provider";
import { debtsTypes } from "../types/debts.types";

export const getDebtsAction = () => {
    return (dispatch: Function) => {
        debtProvider
            .getAll()
            .then((res) => {
                dispatch({
                    type: debtsTypes.GET_ALL,
                    payload: res?.data,
                });
            })
            .catch((err) => err);
    };
};

export const addDebtsAction = (data: DebtsI) => {
    return (dispatch: Function, getStore: Function) => {
        debtProvider
            .create(data)
            .then((res) => {
                if (res.error)
                    return sweetAlert.alert("Error", res?.error?.message, "error");
                sweetAlert.alert("Success", "Done!", "success");
                dispatch({
                    type: debtsTypes.ADD_ITEM,
                    payload: [
                        {
                            ...res?.data?.response,
                            ...(data?.expense && { expense: +data.expense }),
                        },
                    ].concat(getStore().debts.debts),
                });
            })
            .catch((err) => err);
    };
};

export const removeDebtsAction = (uuid: string) => {
    return async (dispatch: Function, getStore: Function) => {
        const confirm = await sweetAlert.question("Are you sure?", "warning");
        if (!confirm) return;
        debtProvider
            .remove(uuid)
            .then((res) => {
                if (res.error)
                    return sweetAlert.alert("Error", res?.error?.message, "error");
                sweetAlert.alert("Success", "Done!", "success");
                dispatch({
                    type: debtsTypes.REMOVE_ITEM,
                    payload: getStore().debts.debts.filter(
                        (item: any) => item.uuid !== uuid
                    ),
                });
            })
            .catch((error) => error);
    };
};

export const updateDebtsAction = (uuid: string, data: DebtsI) => {
    return async (dispatch: Function, getStore: Function) => {
        debtProvider
            .update(uuid, data)
            .then((res) => {
                if (res.error)
                    return sweetAlert.alert("Error", res?.error?.message, "error");
                sweetAlert.alert("Success", "Updated!", "success");
                dispatch({
                    type: debtsTypes.UPDATE_ITEM,
                    payload: getStore().debts.debts.map((item: DebtsI) =>
                        item.uuid == uuid ? {
                            ...item,
                            ...data,
                            ...(data.expense && { expense: +data.expense }),
                        } : item
                    ),
                });
            })
            .catch((error) => error);
    };
};
