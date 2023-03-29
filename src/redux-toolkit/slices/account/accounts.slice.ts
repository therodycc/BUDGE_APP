import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface AccountStateI {
    accounts: any[]
}

const accountState: AccountStateI = {
    accounts: [],
}

export const accountSlice = createSlice({
    name: 'account',
    initialState: accountState,
    reducers: {
        setAccount: (state: AccountStateI, action: PayloadAction<AccountStateI>) => {
            return {
                ...state,
                ...action.payload
            }
        }
    },
})

export const accountActions = accountSlice.actions

export default accountSlice.reducer