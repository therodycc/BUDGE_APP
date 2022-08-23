import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { UserI } from '../../interfaces/user/user.interface';

export interface MeStateI {
    result: any | null
}

const meState: MeStateI = {
    result: null,
}

export const meSlice = createSlice({
    name: 'me',
    initialState: meState,
    reducers: {
        getMeAction: (state: MeStateI, action: PayloadAction<{ me: UserI }>) => {
            state.result = action.payload.me
        },
    },
})

export const { getMeAction } = meSlice.actions

export default meSlice.reducer