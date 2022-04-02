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
import { volunteerThingsReducer } from '../reducers/volunteer-things'
import { necessaryReducer } from '../reducers/necessary'


const reducers = combineReducers({
    auth: authReducer,
    fixedCosts: fixedCostsReducer,
    manage: ManageReducer,
    profits: profitsReducer,
    user: userReducer,
    debts: debtsReducer,
    wishes: wishesReducer,
    volunteerThings: volunteerThingsReducer,
    necessary: necessaryReducer,
})

export const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(thunk))
)