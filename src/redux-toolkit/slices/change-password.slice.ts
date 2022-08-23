import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

export interface ChangePasswordStateI {
    form: {
        newPassword: string,
    }
}

const changePasswordState: ChangePasswordStateI = {
    form: {
        newPassword: '',
    },
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