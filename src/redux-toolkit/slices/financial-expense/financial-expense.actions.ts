import sweetAlert from "../../../helpers/alerts/sweetAlert.helper";
import financialExpenseProvider from "../../../providers/financial-expense/financial-expense.provider";
import { financialExpensesActions } from "./financial-expense.slice";

export const getAllFinancialExpenses = () => {
    return async (dispatch: Function) => {
        const res = await financialExpenseProvider.getAll()
        if (res.error) return sweetAlert.toast("Error", res?.error?.message, "error");

        dispatch(financialExpensesActions.setAccount({
            financialExpenses: res
        }))
    }
}