import { createSelector } from '@reduxjs/toolkit';
import { AppState } from '../../store/root-reducer';

const accountState = (state: AppState) => state.account;

const getAllAccounts = createSelector(accountState, state => state.accounts);
const getTransactionsOfActiveAccount = createSelector(accountState, state => state.accounts.find(item => item?.active)?.transactions);

export const accountSelector = {
    getAllAccounts,
    getTransactionsOfActiveAccount
};
