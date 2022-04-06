import { profitsTypes } from "../types/profits.types"

const initialState = {}

export const profitsReducer = (state: any = initialState, action: any) => {

    switch (action.type) {
        case profitsTypes.GET_ALL_PROFITS :
            return {
                ...state,
                profits: action.payload
            }
        case profitsTypes.UPDATE_ITEM_PROFITS:
            return {
                ...state,
                profits: action.payload
            }
        case profitsTypes.ADD_ITEM_PROFITS:
            return {
                ...state,
                profits: action.payload
            }
        case profitsTypes.DELETE_ITEM_PROFITS:
            return {
                ...state,
                profits: action.payload
            }
        case profitsTypes.DISABLE_ITEM_PROFITS:
            return {
                ...state,
                profits: action.payload
            }
        default:
            return state
    }
}