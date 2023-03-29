import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { currencyFormat } from "../../../../helpers/currency.helper";

interface HeadersTransactionsI {
    children: ({ columns }: { columns: any }) => JSX.Element
}

export const HeadersTransactions = ({ children }: HeadersTransactionsI) => {

    const columns = [
        {
            title: "Title",
            render: ({ item, index }: any) => {
                return (
                    <div className="d-flex align-items-center justify-content-center h-100" style={{ height: "100%" }}>
                        {item.type === "WITHDRAW" ? <FontAwesomeIcon icon={faArrowDown} className="text-lg text-danger" /> : <FontAwesomeIcon icon={faArrowUp} className="text-lg text-success" />}
                    </div>
                );
            },

        },
        {
            title: "Expense",
            render: ({ item }: any) => {
                return (
                    <div className="d-flex flex-column">
                        <h6 className="mb-1 text-dark text-sm">Netflix</h6>
                        <span className="text-xs">27 March 2020, at 12:30 PM</span>
                    </div>
                );
            },
        },
        {
            title: "To",
            render: ({ item, index }: any) => {
                return (
                    <div className={`d-flex align-items-center justify-content-end text-${item.type === "WITHDRAW" ? 'danger' : 'success'} text-gradient text-sm font-weight-bold`}>
                        {currencyFormat(item?.amount)}
                    </div>
                );
            },
        },
    ]

    return children({ columns })
}