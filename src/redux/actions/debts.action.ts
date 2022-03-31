import sweetAlert from "../../helpers/alerts/sweetAlert.helper";
import debtProvider from "../../providers/debt/debt.provider";
import profitsProvider from "../../providers/profits/profits.provider";
import { debtsTypes } from "../types/debts.types";
import { profitsTypes } from "../types/profits.types";

export const getDebtsAction = () => {
    return (dispatch: Function) => {
        debtProvider.getAll()
            .then(res => {
                dispatch({
                    type: debtsTypes.GET_ALL_DEBTS,
                    payload: res?.data
                })
            })
            .catch(err => err)
    }
}


export const removeDebtAction = (id: string) => {
    return async (dispatch: Function, getStore: Function) => {
        const confirm = await sweetAlert.question("Are you sure?", "warning");
        if (!confirm) return;
        debtProvider
            .remove(id)
            .then((data) => {
                dispatch({
                    type: debtsTypes.REMOVE_DEBT,
                    payload: getStore().debts.debts.filter((item: any) => item.id !== id)
                })
            })
            .catch((error) => error);
    }
}