import { ManageTypes } from "../types/manage.type";

const initialState = {}

export const ManageReducer = (state: any = initialState, action: any) => {

    switch (action.type) {
        case ManageTypes.GET_ALL:
            return {
                ...state,
                manage: action.payload
            }
        case ManageTypes.REMOVE_ITEM:
            return {
                ...state,
                manage: action.payload
            }
        case ManageTypes.UPDATE_ITEM:
            return {
                ...state,
                manage: action.payload
            }
        case ManageTypes.REMOVE_ALL_MANAGE:
            return { manage: [] }
        default:
            return state
    }
}