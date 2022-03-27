import { UtilitiesTypes } from "../types/utilities.type";

const initialState = {}

export const utilitiesReducer = (state: any = initialState, action: any) => {

    switch (action.type) {
        case UtilitiesTypes.GET_ALL:
            return {
                ...state,
                utilities: action.payload
            }
        case UtilitiesTypes.REMOVE_ITEM:
            return {
                ...state,
                utilities: action.payload
            }
        default:
            return state
    }
}