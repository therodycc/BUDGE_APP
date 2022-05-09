import { userTypes } from "../types/user.types";

const initialState = {
    me: null
}

export const userReducer = (state: any = initialState, action: any) => {
    switch (action.type) {
        case userTypes.GET_USER:
            return {
                ...state,
                me: action.payload
            }

        default:
            return state
    }
}