import { currencyFormat } from "../../helpers/currency.helper";
interface headItemsNecessaryI {
    addToThisMonth: Function
    showModalEdit: Function
    removeItem: Function
}
export const headersModalNecessary = ({ addToThisMonth, showModalEdit, removeItem }: headItemsNecessaryI) => [
    {
        title: "Title",
        render: ({ item }: any) => {
            return (
                <div className="d-flex px-3 py-1">
                    <div>
                        <img
                            src={
                                item.img ||
                                "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/blue-shoe.jpg "
                            }
                            className="avatar me-3"
                            alt="image"
                        />
                    </div>
                    <div className="d-flex flex-column justify-content-center">
                        <h6 className="mb-0 text-sm">{item.name}</h6>
                        <p className="text-sm font-weight-normal text-secondary mb-0">
                            <span
                                className={`text-${item.expense - item.paidOut === 0 ? "success" : "danger"
                                    } font-weight-bold mx-1`}
                            >
                                {currencyFormat(item.expense - item.paidOut)}
                            </span>
                            {item.category}
                        </p>
                    </div>
                </div>
            );
        },
    },
    {
        title: "Expense",
        render: ({ item }: any) => {
            return (
                <>
                    <span>{currencyFormat(item.expense)}</span>
                </>
            );
        },
    },
    {
        title: "Status",
        render: ({ item }: any) => {
            return (
                <>
                    <div className="btn-group">
                        <span
                            className={` text-${item.status === "PENDING" ? "danger" : "light"
                                } display-8`}
                        >
                            {" "}
                            <i className="fas fa-circle"></i>
                        </span>
                        <span
                            className={` text-${item.status === "IN_PROGRESS" ? "warning" : "light"
                                } display-8 mx-2`}
                        >
                            {" "}
                            <i className="fas fa-circle"></i>
                        </span>
                        <span
                            className={` text-${item.status === "COMPLETED" ? "success" : "light"
                                } display-8 `}
                        >
                            <i className="fas fa-circle"></i>
                        </span>
                    </div>
                </>
            );
        },
    },
    {
        title: "Actions",
        render: ({ item }: any) => {
            return (
                <>
                    <div className="btn-group">
                        <button
                            type="button"
                            className={`btn btn-success btn-sm`}
                            onClick={() => {
                                addToThisMonth(item);
                            }}
                        >
                            <i className="fas fa-plus-circle"></i>
                        </button>
                        <button
                            type="button"
                            className={`btn btn-secondary btn-sm`}
                            onClick={() => {
                                showModalEdit(item);
                            }}
                        >
                            <i className="fas fa-spinner"></i>
                        </button>
                        <button
                            type="button"
                            className={`btn btn-light btn-sm`}
                            onClick={() => {
                                removeItem(item);
                            }}
                        >
                            <i className="far fa-trash-alt"></i>
                        </button>
                    </div>
                </>
            );
        },
    },
]
