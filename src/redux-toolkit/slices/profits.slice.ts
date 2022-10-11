import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { ProfitsI } from '../../interfaces/profits/profits.interface'

export interface ProfitsStateI {
    result: ProfitsI[] | null
}

const profitsState: ProfitsStateI = {
    result: null,
}
export const profitsSlice = createSlice({
    name: 'profits',
    initialState: profitsState,
    reducers: {
        addProfits: (state: ProfitsStateI, action: PayloadAction<{ result: ProfitsI[] }>) => {
            state.result = action.payload.result
        },
        addNewProfit: (state: ProfitsStateI, action: PayloadAction<{ profit: ProfitsI }>) => {
            console.log(action.payload.profit);
            state.result && (state.result = [action.payload.profit, ...state.result])
        },
        updateProfit: (state: ProfitsStateI, action: PayloadAction<{ profit: ProfitsI }>) => {
            state.result && (state.result = state.result.map((item: ProfitsI) =>
                item.uuid == action.payload.profit.uuid ? {
                    ...item,
                    ...action.payload.profit
                } : item))
        },
        removeProfit: (state: ProfitsStateI, action: PayloadAction<{ uuid: string }>) => {
            state.result && (state.result = state.result.filter((item: ProfitsI) => item.uuid != action.payload.uuid))
        },
        disableProfit: (state: ProfitsStateI, action: PayloadAction<{ item: ProfitsI }>) => {
            state.result && (state.result = state.result?.map((fc: any) => {
                if (fc.uuid === action.payload.item.uuid) fc.active = !action.payload.item.active;
                return fc;
            }))
        }
    },
})

export const { addProfits, addNewProfit, updateProfit, removeProfit, disableProfit } = profitsSlice.actions

export default profitsSlice.reducer