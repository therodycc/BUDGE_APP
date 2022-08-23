import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

export interface TestStateI {
    value: number
}

const testState: TestStateI = {
    value: 0,
}

export const testSlice = createSlice({
    name: 'test',
    initialState: testState,
    reducers: {
        testAction: (state: TestStateI, action: PayloadAction<{}>) => {
            state.value = 0
        },
    },
})

export const { testAction } = testSlice.actions

export default testSlice.reducer