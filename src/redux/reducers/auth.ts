

import { AuthTypeAction } from "../types/auth.type";
const initialState = {}
export const authReducer = (state: any = initialState, action: any) => {
    switch (action.type) {
        case AuthTypeAction.SIGN_IN:
            return action.payload

        case AuthTypeAction.SIGN_UP:
            return {}

        default: return state
    }
}