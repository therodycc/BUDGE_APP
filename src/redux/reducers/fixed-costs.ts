import { fixedCostsTypes } from "../types/fixed-costs.types"

const initialState = {
    fixedCosts: []
}
export const fixedCostsReducer = (state: any = initialState, action: any) => {
    switch (action.type) {
        case fixedCostsTypes.GET_ALL:
            return {
                ...state,
                fixedCosts: action.payload
            }
        case fixedCostsTypes.ADD_ITEM:
            return {
                ...state,
                fixedCosts: action.payload
            }
        case fixedCostsTypes.UPDATE_ITEM_FIXED_COSTS:
            return {
                ...state,
                fixedCosts: action.payload
            }
        case fixedCostsTypes.REMOVE_ITEM:
            return {
                ...state,
                fixedCosts: action.payload
            }
        case fixedCostsTypes.DISABLE_ITEM:
            return {
                ...state,
                fixedCosts: action.payload
            }
        default:
            return state
    }
}
