import React, { useCallback, useEffect } from 'react'
import { getAllAccounts } from '../../../redux-toolkit/slices/account/account.actions'
import { accountSelector } from '../../../redux-toolkit/slices/account/account.selector'
import { accountActions } from '../../../redux-toolkit/slices/account/accounts.slice'
import { useDispatch, useSelector } from '../../../redux-toolkit/store'
import { CardAccount } from '../../common/card/card-account'
import { TransactionsTable } from './transactions/transactions-table'

export const Accounts = () => {
    const dispatch = useDispatch()
    const accounts = useSelector(accountSelector.getAllAccounts)

    useEffect(() => {
        dispatch(getAllAccounts())
    }, [dispatch]);

    const handleSelect = useCallback((account) => {
        dispatch(accountActions.setAccount({
            accounts: accounts.map(item => ({ ...item, active: item.uuid === account.uuid }))
        }))
    }, [accounts, dispatch])

    return (
        <React.Fragment>
            <div className="row">
                {accounts.map(item => (
                    <div key={item.id} className=" col-4">
                        <CardAccount item={item} onClick={handleSelect} />
                    </div>
                ))}
            </div>
            <div className="col-lg-5 col-12  mt-5">
                <div className="card h-100 mb-4">
                    <div className="card-header pb-0 px-3">
                        <div className="row">
                            <div className="col-md-6">
                                <h6 className="mb-0">Your Transaction&apos;s</h6>
                            </div>
                            <div className="col-md-6 d-flex justify-content-start justify-content-md-end align-items-center">
                                <small>23 - 30 March 2020</small>
                            </div>
                        </div>
                    </div>
                    <TransactionsTable />
                </div>
            </div>
        </React.Fragment>
    )
}
