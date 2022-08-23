import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

export interface ChangePasswordStateI {
    form: any
}

const changePasswordState: ChangePasswordStateI = {
    form: null,
}

export const changePasswordSlice = createSlice({
    name: 'changePassword',
    initialState: changePasswordState,
    reducers: {
        setFormForChangePassword: (state: ChangePasswordStateI, action: PayloadAction<{ form: any }>) => {
            state.form = action.payload.form
        },
    },
})

export const { setFormForChangePassword } = changePasswordSlice.actions

export default changePasswordSlice.reducer