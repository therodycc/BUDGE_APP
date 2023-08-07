import { combineReducers } from 'redux';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import accountReducer from '../slices/account/accounts.slice';
// reducers
import changePasswordReducer from '../slices/change-password.slice';
import debtsReducer from '../slices/debts.slice';
import financialExpenseReducer from '../slices/financial-expense/financial-expense.slice';
import fixedCostsReducer from '../slices/fixed-costs.slice';
import manageReducer from '../slices/manage/manage.slice';
import meReducer from '../slices/me.slice';
import necessaryReducer from '../slices/necessary.slice';
import profitsReducer from '../slices/profits.slice';
import volunteerThingsReducer from '../slices/volunteer-things.slice';
import wishesReducer from '../slices/wishes.slice';

const createNoopStorage = () => ({
    getItem() {
        return Promise.resolve(null);
    },
    setItem(_key: any, value: any) {
        return Promise.resolve(value);
    },
    removeItem() {
        return Promise.resolve();
    }
});

const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();

const rootPersistConfig = {
    key: 'root',
    storage,
    keyPrefix: 'redux-',
    whitelist: []
};

// const socketNotificationsPersistConfig = {
//     key: 'socketNotifications',
//     storage,
//     keyPrefix: 'redux-'
//   };

const rootReducer = combineReducers({
    debts: debtsReducer,
    me: meReducer,
    profits: profitsReducer,
    manage: manageReducer,
    necessary: necessaryReducer,
    volunteerThings: volunteerThingsReducer,
    wishes: wishesReducer,
    fixedCosts: fixedCostsReducer,
    changePassword: changePasswordReducer,
    account: accountReducer,
    financialExpenses: financialExpenseReducer
    // test: persistReducer(testPersistConfig, testReducer),
});

export type AppState = ReturnType<typeof rootReducer>;

export { rootReducer, rootPersistConfig };
