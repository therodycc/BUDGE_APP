import { configureStore } from '@reduxjs/toolkit'
import debtsReducer from '../slices/debts.slice'
import manageReducer from '../slices/manage.slice'
import meReducer from '../slices/me.slice'
import necessaryReducer from '../slices/necessary.slice'
import profitsReducer from '../slices/profits.slice'
import volunteerThingsReducer from '../slices/volunteer-things.slice'
import wishesReducer from '../slices/wishes.slice'

export const store = configureStore({
    reducer: {
        debts: debtsReducer,
        me: meReducer,
        profits: profitsReducer,
        manage: manageReducer,
        necessary: necessaryReducer,
        volunteerThings: volunteerThingsReducer,
        wishes: wishesReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch