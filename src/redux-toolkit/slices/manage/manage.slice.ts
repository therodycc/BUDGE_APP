import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { ManageI } from '../../../interfaces/manage/manage.interface';

export interface ManageStateI {
    result: ManageI[]
}

const manageState: ManageStateI = {
    result: [],
}

export const manageSlice = createSlice({
    name: 'manage',
    initialState: manageState,
    reducers: {
        addManage: (state: ManageStateI, action: PayloadAction<{ result: ManageI[] }>) => {
            state.result = action.payload.result
        },
        addNewManage: (state: ManageStateI, action: PayloadAction<{ manage: ManageI }>) => {
            state.result && (state.result = [action.payload.manage, ...state.result])
        },
        updateManage: (state: ManageStateI, action: PayloadAction<{ manage: ManageI }>) => {
            state.result && (state.result = state.result.map((item: ManageI) =>
                item.uuid == action.payload.manage.uuid ? {
                    ...item,
                    ...action.payload.manage
                } : item))
        },
        removeManage: (state: ManageStateI, action: PayloadAction<{ uuid: string }>) => {
            state.result && (state.result = state.result.filter((item: ManageI) => item.uuid != action.payload.uuid))
        },
        removeAllManage: (state: ManageStateI) => {
            state.result = []
        }
    },
})

export const { addManage, addNewManage, updateManage, removeManage, removeAllManage } = manageSlice.actions

export default manageSlice.reducer