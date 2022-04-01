import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { authReducer } from '../reducers/auth'
import { debtsReducer } from '../reducers/debts'
import { fixedCostsReducer } from '../reducers/fixed-costs'
import { profitsReducer } from '../reducers/profits'
import { userReducer } from '../reducers/user'
import { ManageReducer } from '../reducers/manage'
import { wishesReducer } from '../reducers/wishes'


const reducers = combineReducers({
    auth: authReducer,
    fixedCosts: fixedCostsReducer,
    manage: ManageReducer,
    profits: profitsReducer,
    user: userReducer,
    debts: debtsReducer,
    wishes: wishesReducer,
})

export const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(thunk))
)