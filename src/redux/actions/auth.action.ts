import { LoginStoreDataI } from '../../interfaces/redux/actions/login.interface'
import { AuthTypeAction } from '../types/auth.type'


export const login = (payload: LoginStoreDataI) => ({
    type: AuthTypeAction.SIGN_IN,
    payload
})