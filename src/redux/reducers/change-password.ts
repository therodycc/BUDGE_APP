import { ChangePasswordTypeAction } from "../types/change-password"


const initialState: ChangePasswordStateI = {
    form: {
        password: '',
        newPassword: '',
        confirmPassword: ''
    }
}
interface ChangePasswordStateI {
    form: { password: string, newPassword: string, confirmPassword: string }
}
export const changePasswordReducer = (state: ChangePasswordStateI = initialState, action: any) => {
    switch (action.type) {
        case ChangePasswordTypeAction.SET_FORM_DATA:
            return state.form = action.payload.form

        default:
            return state
    }
}