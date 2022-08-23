import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { WishesI } from '../../interfaces/wishes/wishes.interface'

export interface WishesStateI {
    result: WishesI[] | null
}

const wishesState: WishesStateI = {
    result: null,
}

export const wishesSlice = createSlice({
    name: 'wishes',
    initialState: wishesState,
    reducers: {
        addWishes: (state: WishesStateI, action: PayloadAction<{ result: WishesI[] }>) => {
            state.result = action.payload.result
        },
        addNewWish: (state: WishesStateI, action: PayloadAction<{ wishes: WishesI }>) => {
            state.result && (state.result = [action.payload.wishes, ...state.result])
        },
        updateWish: (state: WishesStateI, action: PayloadAction<{ wishes: WishesI }>) => {
            state.result && (state.result = state.result.map((item: WishesI) =>
                item.uuid == action.payload.wishes.uuid ? action.payload.wishes : item))
        },
        removeWish: (state: WishesStateI, action: PayloadAction<{ uuid: string }>) => {
            state.result && (state.result = state.result.filter((item: WishesI) => item.uuid != action.payload.uuid))
        }
    },
})

export const { addWishes, addNewWish, updateWish, removeWish } = wishesSlice.actions

export default wishesSlice.reducer