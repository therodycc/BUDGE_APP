import { DebtsI } from "../../interfaces/debts/debts.interface"
import { debtsTypes } from "../types/debts.types"

const initialState: DebtsReducerI = {
    debts: null
}

interface DebtsReducerI {
    debts: DebtsI | null
}

export const debtsReducer = (state: any = initialState, action: any) => {

    switch (action.type) {
        case debtsTypes.GET_ALL:
            return {
                ...state,
                debts: action.payload
            }
        case debtsTypes.ADD_ITEM:
            return {
                ...state,
                debts: action.payload
            }
        case debtsTypes.REMOVE_ITEM:
            return {
                ...state,
                debts: action.payload
            }
        case debtsTypes.UPDATE_ITEM:
            return {
                ...state,
                debts: action.payload
            }
        default:
            return state
    }
}