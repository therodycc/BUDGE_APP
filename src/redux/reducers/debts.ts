import { debtsTypes } from "../types/debts.types"

const initialState = {}

export const debtsReducer = (state: any = initialState, action: any) => {

    switch (action.type) {
        case debtsTypes.GET_ALL:
            return {
                ...state,
                necessary: action.payload
            }
        case debtsTypes.ADD_ITEM:
            return {
                ...state,
                necessary: action.payload
            }
        case debtsTypes.REMOVE_ITEM:
            return {
                ...state,
                necessary: action.payload
            }
        case debtsTypes.UPDATE_ITEM:
            return {
                ...state,
                necessary: action.payload
            }
        default:
            return state
    }
}