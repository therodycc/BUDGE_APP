import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface FinancialExpenseStateI {
    financialExpenses: {
        data: any[] | null,
        count: number
    }
}

const accountState: FinancialExpenseStateI = {
    financialExpenses: {
        data: null,
        count: 0
    }
}

export const financialExpenseSlice = createSlice({
    name: 'financial-expense',
    initialState: accountState,
    reducers: {
        setAccount: (state: FinancialExpenseStateI, action: PayloadAction<FinancialExpenseStateI>) => {
            return {
                ...state,
                ...action.payload
            }
        }
    },
})

export const financialExpensesActions = financialExpenseSlice.actions

export default financialExpenseSlice.reducer