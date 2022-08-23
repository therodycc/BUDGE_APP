import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { NecessaryI } from '../../interfaces/necessary/necessary.interface'

export interface NecessaryStateI {
    result: NecessaryI[] | null
}

const necessaryState: NecessaryStateI = {
    result: null,
}

export const necessarySlice = createSlice({
    name: 'necessaries',
    initialState: necessaryState,
    reducers: {
        addNecessaries: (state: NecessaryStateI, action: PayloadAction<{ result: NecessaryI[] }>) => {
            state.result = action.payload.result
        },
        addNewNecessary: (state: NecessaryStateI, action: PayloadAction<{ necessary: NecessaryI }>) => {
            state.result && (state.result = [action.payload.necessary, ...state.result])
        },
        updateNecessary: (state: NecessaryStateI, action: PayloadAction<{ necessary: NecessaryI }>) => {
            state.result && (state.result = state.result.map((item: NecessaryI) =>
                item.uuid == action.payload.necessary.uuid ? action.payload.necessary : item))
        },
        removeNecessary: (state: NecessaryStateI, action: PayloadAction<{ uuid: string }>) => {
            state.result && (state.result = state.result.filter((item: NecessaryI) => item.uuid != action.payload.uuid))
        }
    },
})

export const { addNecessaries, addNewNecessary, updateNecessary, removeNecessary } = necessarySlice.actions

export default necessarySlice.reducer