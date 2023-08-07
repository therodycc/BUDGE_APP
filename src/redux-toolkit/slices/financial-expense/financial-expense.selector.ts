import { createSelector } from '@reduxjs/toolkit';
import { AppState } from '../../store/root-reducer';

const financialExpenseState = (state: AppState) => state.financialExpenses;

const getAll = createSelector(financialExpenseState, state => state.financialExpenses);

export const financialExpenseSelector = {
    getAll
};
