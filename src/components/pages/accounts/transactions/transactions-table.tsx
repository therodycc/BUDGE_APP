import React from 'react'
import { useSelector } from 'react-redux'
import { accountSelector } from '../../../../redux-toolkit/slices/account/account.selector'
import TBody from '../../../common/table/t-body'
import { HeadersTransactions } from './table-options'

export const TransactionsTable = () => {
    const transactionsOfActiveAccount = useSelector(accountSelector.getTransactionsOfActiveAccount)

    return (
        <div className="card-body pt-4 p-3 w-100">
            <h6 className="text-uppercase text-body text-xs font-weight-bolder mb-3">Newest</h6>
            <table>
                <HeadersTransactions>
                    {({ columns }) => (
                        <TBody bodyItems={transactionsOfActiveAccount} headItems={columns} />
                    )}
                </HeadersTransactions>
            </table>
        </div>
    )
}
