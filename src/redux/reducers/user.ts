import { userTypes } from "../types/user.types";

const initialState = {
    user: {}
}

export const userReducer = (state: any = initialState, action: any) => {
    switch (action.type) {
        case userTypes.GET_USER:
            return {
                ...state,
                user: action.payload
            }

        default:
            return state
    }
}