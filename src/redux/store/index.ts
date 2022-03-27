import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { authReducer } from '../reducers/auth'
import { debtsReducer } from '../reducers/debts'
import { fixedCostsReducer } from '../reducers/fixed-costs'
import { profitsReducer } from '../reducers/profits'
import { userReducer } from '../reducers/user'
import { utilitiesReducer } from '../reducers/utilities'


const reducers = combineReducers({
    auth: authReducer,
    fixedCosts: fixedCostsReducer,
    utilities: utilitiesReducer,
    profits: profitsReducer,
    user: userReducer,
    debts:debtsReducer
})

export const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(thunk))
)