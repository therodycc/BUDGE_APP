import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { DebtsI } from '../../interfaces/debts/debts.interface'

export interface DebtsStateI {
    result: DebtsI[] | null
}

const debtsState: DebtsStateI = {
    result: null,
}

export const debtsSlice = createSlice({
    name: 'debts',
    initialState: debtsState,
    reducers: {
        addDebts: (state: DebtsStateI, action: PayloadAction<{ result: DebtsI[] }>) => {
            state.result = action.payload.result
        },
        addNewDebt: (state: DebtsStateI, action: PayloadAction<{ debt: DebtsI }>) => {
            state.result && (state.result = [action.payload.debt, ...state.result])
        },
        updateDebt: (state: DebtsStateI, action: PayloadAction<{ debt: DebtsI }>) => {
            state.result && (state.result = state.result.map((item: DebtsI) =>
                item.uuid == action.payload.debt.uuid ? {
                    ...item,
                    ...action.payload.debt
                } : item))
        },
        removeDebt: (state: DebtsStateI, action: PayloadAction<{ uuid: string }>) => {
            state.result && (state.result = state.result.filter((item: DebtsI) => item.uuid != action.payload.uuid))
        }
    },
})

export const { addDebts, addNewDebt, updateDebt, removeDebt } = debtsSlice.actions

export default debtsSlice.reducer