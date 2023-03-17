import React from 'react'
import TBody from '../../../common/table/t-body'
import { HeadersTransactions } from './table-options'

export const TransactionsTable = () => {
    return (
        <div className="card-body pt-4 p-3 w-100">
            <h6 className="text-uppercase text-body text-xs font-weight-bolder mb-3">Newest</h6>
            <ul className="list-group ">
                <HeadersTransactions>
                    {({ columns }) => (
                        <TBody bodyItems={[1, 2, 3]} headItems={columns} />
                    )}
                </HeadersTransactions>
            </ul>
        </div>
    )
}
