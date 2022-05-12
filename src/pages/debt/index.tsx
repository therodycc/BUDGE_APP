import { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "../../components/common/box";
import Button from "../../components/common/button";
import CardMini from "../../components/common/card/CardMini";
import Table from "../../components/common/table";
import Layout from "../../components/layout";
import ModalDebts from "../../components/pages/debts/modals";
import sweetAlert from "../../helpers/alerts/sweetAlert.helper";
import { currencyFormat } from "../../helpers/currency.helper";
import { UtilityI } from "../../interfaces/utility/utility.interface";
import debtProvider from "../../providers/debt/debt.provider";
import utilitiesProvider from "../../providers/utilities/utilities.provider";
import { getDebtsAction, removeDebtsAction } from "../../redux/actions/debts.action";

const Debt = () => {
    const [totalDebts, setTotalDebts] = useState(0);
    const [totalCompleted, setTotalCompleted] = useState(0);
    const [totalMissing, setTotalMissing] = useState(0);
    const [showModal, setShowModal] = useState(false)
    const [dataModalUtility, setDataModalUtility] = useState<UtilityI | null>(null);

    const dispatch = useDispatch()
    const { debts: { debts } } = useSelector((state: any) => state)

    const [headItems, setHeadItems] = useState([
        {
            title: "Title",
            render: ({ item }: any) => {
                return (
                    <div className="d-flex px-3 py-1">
                        <div>
                            <img
                                src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/blue-shoe.jpg"
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
            title: "Description",
            render: ({ item }: any) => {
                return (
                    <>
                        <span>{item.description}</span>
                    </>
                );
            },
        },
        {
            title: "To Whom",
            render: ({ item }: any) => {
                return (
                    <>
                        <span>{item.to}</span>
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
                                    showModalEdit(item)
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
    ]);

    useEffect(() => {
        dispatch(getDebtsAction())
    }, []);

    useEffect(() => {
        setTotalDebts(getTotalDebts());
        setTotalCompleted(getTotalCompleted());
    }, [debts]);

    useEffect(() => {
        setTotalMissing(getTotalMissing());
    }, [totalCompleted, totalMissing]);



    const getTotalDebts = () => {
        return debts?.reduce((acc: any, item: any) => {
            acc += item.expense;
            return acc;
        }, 0);
    };

    const getTotalCompleted = () => {
        return debts?.reduce((acc: any, item: any) => {
            if (item.status === "COMPLETED") acc += item.expense;
            if (item.status === "IN_PROGRESS") acc += item.paidOut;
            return acc;
        }, 0);
    };

    const getTotalMissing = () => {
        return totalDebts - totalCompleted;
    };

    const addToThisMonth = (item: UtilityI) => {
        debtProvider.update(item.id, {
            status: 'IN_PROGRESS'
        })
            .then(res => {
            })
            .catch(error => error)
        utilitiesProvider
            .postItem(item)
            .then((res) => {
                sweetAlert.alert("Done!", "Added to this month", "success");
            })
            .catch((error) => error);
    };

    const removeItem = async (item: UtilityI) => {
        dispatch(removeDebtsAction(item?.uuid))
    };


    const showModalEdit = (item: UtilityI) => {
        setDataModalUtility(item)
        setShowModal(!showModal)
    }
    return (
        <>
            <div className="container">
                <div className="row mb-5">
                    <div className="col-sm-4">
                        <CardMini amount={currencyFormat(totalDebts)} title="Total" />
                    </div>
                    <div className="col-sm-4 mt-sm-0 mt-4">
                        <CardMini
                            amount={currencyFormat(totalMissing)}
                            title="Total missing"
                        />
                    </div>
                    <div className="col-sm-4 mt-sm-0 mt-4">
                        <CardMini
                            amount={currencyFormat(totalCompleted)}
                            title="Total completed"
                        />
                    </div>
                </div>
                <Box
                    title="Debt"
                    rightSection={
                        <>
                            <div className="">
                                <Button
                                    bgClass={"success"}
                                    type={"button"}
                                    loading={false}
                                    action={() => {
                                        setShowModal(true);
                                        setDataModalUtility(null);
                                    }}
                                >
                                    Add new
                                </Button>
                            </div>
                        </>
                    }
                >
                    <Table headItems={headItems} bodyItems={debts} />
                </Box>
            </div>
            {showModal && (
                <ModalDebts
                    active={showModal}
                    toggle={() => {
                        setShowModal(false)
                    }}
                    data={dataModalUtility} />
            )}
        </>
    );
};
Debt.getLayout = (page: ReactElement) => (
    <Layout>
        {page}
    </Layout >
)

export default Debt;
