import { VolunteerThingsTypes } from "../types/volunteer-things.types"

const initialState = {}

export const volunteerThingsReducer = (state: any = initialState, action: any) => {

    switch (action.type) {
        case VolunteerThingsTypes.GET_ALL:
            return {
                ...state,
                volunteerThings: action.payload
            }
        case VolunteerThingsTypes.ADD_ITEM:
            return {
                ...state,
                volunteerThings: action.payload
            }
        case VolunteerThingsTypes.REMOVE_ITEM:
            return {
                ...state,
                volunteerThings: action.payload
            }
        case VolunteerThingsTypes.UPDATE_ITEM:
            return {
                ...state,
                volunteerThings: action.payload
            }
        default:
            return state
    }
}