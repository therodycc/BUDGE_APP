
import { RccNotifications } from "rcc-react-lib";
import financialExpenseProvider from "../../../providers/financial-expense/financial-expense.provider";
import { financialExpensesActions } from "./financial-expense.slice";

export const getAllFinancialExpenses = () => {
    return async (dispatch: Function) => {
        const res = await financialExpenseProvider.getAll()
        if (res.error) return RccNotifications.toast("Error", res?.error?.message, "error");

        dispatch(financialExpensesActions.setAccount({
            financialExpenses: res
        }))
    }
}