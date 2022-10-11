import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { FixedCostsI } from '../../interfaces/fixed-costs/fixed-costs.interface'

export interface FixedCostsStateI {
    result: FixedCostsI[] | null
}

const fixedCostsState: FixedCostsStateI = {
    result: null,
}
export const profitsSlice = createSlice({
    name: 'fixedCosts',
    initialState: fixedCostsState,
    reducers: {
        addFixedCosts: (state: FixedCostsStateI, action: PayloadAction<{ result: FixedCostsI[] }>) => {
            state.result = action.payload.result
        },
        addNewFixedCost: (state: FixedCostsStateI, action: PayloadAction<{ fixedCost: FixedCostsI }>) => {
            state.result && (state.result = [action.payload.fixedCost, ...state.result])
        },
        updateFixedCost: (state: FixedCostsStateI, action: PayloadAction<{ fixedCost: FixedCostsI }>) => {
            state.result && (state.result = state.result.map((item: FixedCostsI) =>
                item.uuid == action.payload.fixedCost.uuid ? {
                    ...item,
                    ...action.payload.fixedCost
                } : item))
        },
        removeFixedCost: (state: FixedCostsStateI, action: PayloadAction<{ uuid: string }>) => {
            state.result && (state.result = state.result.filter((item: FixedCostsI) => item.uuid != action.payload.uuid))
        },
        disableFixedCost: (state: FixedCostsStateI, action: PayloadAction<{ item: FixedCostsI }>) => {
            state.result && (state.result = state.result?.map((fc: any) => {
                if (fc.uuid === action.payload.item.uuid) fc.active = !action.payload.item.active;
                return fc;
            }))
        }
    },
})

export const { addFixedCosts, addNewFixedCost, updateFixedCost, removeFixedCost, disableFixedCost } = profitsSlice.actions

export default profitsSlice.reducer