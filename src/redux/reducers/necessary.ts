import { necessaryTypes } from "../types/necessary.types"

const initialState = {}

export const necessaryReducer = (state: any = initialState, action: any) => {

    switch (action.type) {
        case necessaryTypes.GET_ALL_NECESSARY:
            return {
                ...state,
                necessary: action.payload
            }
        case necessaryTypes.ADD_ITEM:
            return {
                ...state,
                necessary: action.payload
            }
        case necessaryTypes.REMOVE_ITEM_NECESSARY:
            return {
                ...state,
                necessary: action.payload
            }
        default:
            return state
    }
}