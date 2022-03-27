import { debtsTypes } from "../types/debts.types"

const initialState = {}

export const debtsReducer = (state: any = initialState, action: any) => {

    switch (action.type) {
        case debtsTypes.GET_ALL_DEBTS:
            return {
                ...state,
                debts: action.payload
            }
        case debtsTypes.REMOVE_DEBT:
            return {
                ...state,
                debts: action.payload
            }
        default:
            return state
    }
}