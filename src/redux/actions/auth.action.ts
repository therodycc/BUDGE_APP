import { LoginStoreDataI } from '../../interfaces/redux/actions/login.interface'
import { AuthTypeAction } from '../types/auth.type'


export const login = (payload: LoginStoreDataI) => ({
    type: AuthTypeAction.SIGN_IN,
    payload
})

export const meAction = () => ({
    type: AuthTypeAction.ME,
    payload: {
        user: {
            firstName: 'Rody',
            lastName: 'Castro Cuello',
            email: 'therodycc.dev@gmail.com',
            phone: '+55 (11) 99999-9999',
            image:""
        }
    }
})

export const logout = () => ({
    type: AuthTypeAction.SIGN_OUT
})