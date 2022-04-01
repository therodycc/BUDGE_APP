import { WishesTypes } from "../types/wishes.types"

const initialState = {}

export const wishesReducer = (state: any = initialState, action: any) => {

    switch (action.type) {
        case WishesTypes.GET_ALL:
            return {
                ...state,
                wishes: action.payload
            }
        case WishesTypes.ADD_ITEM:
            return {
                ...state,
                wishes: action.payload
            }
        case WishesTypes.REMOVE_ITEM:
            return {
                ...state,
                wishes: action.payload
            }
        case WishesTypes.UPDATE_ITEM:
            return {
                ...state,
                wishes: action.payload
            }
        default:
            return state
    }
}