import { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "../../components/common/box";
import Button from "../../components/common/button";
import CardMini from "../../components/common/card/CardMini";
import Table from "../../components/common/table";
import Layout from "../../components/layout";
import ModalFixedCosts from "../../components/pages/fixed-costs/modals";
import sweetAlert from "../../helpers/alerts/sweetAlert.helper";
import { currencyFormat } from "../../helpers/currency.helper";
import { UtilityI } from "../../interfaces/utility/utility.interface";
import fixedCostsProvider from "../../providers/fixed-costs/fixed-costs.provider";
import utilitiesProvider from "../../providers/utilities/utilities.provider";
import { disabledItemAction, getFixedCostsAction, removeFixedCostsAction } from "../../redux/actions/fixed-costs.action";

const FixedCosts = () => {
    const [total, setTotal] = useState(0);
    const [totalActive, setTotalActive] = useState(0);
    const [totalDisabled, setTotalDisabled] = useState(0);
    const [dataModalUtility, setDataModalUtility] = useState<UtilityI | null>(
        null
    );

    // shows
    const [showModal, setShowModal] = useState(false);
    // loadings
    const [showLoadingAddToMoth, setShowLoadingAddToMoth] = useState(false);

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
        {
            title: "Active",
            render: ({ item }: any) => {
                return (
                    <>
                        <div className="form-check form-switch ms-2 my-auto is-filled">
                            <input
                                onClick={() => {
                                    disabledItem(item);
                                }}
                                className="form-check-input"
                                type="checkbox"
                                defaultChecked={item.active}
                            />
                        </div>
                    </>
                );
            },
        },
    ]);

    // stores
    const state = useSelector((state: any) => state)

    const dispatch = useDispatch()

    let fixedCosts: UtilityI[] = state?.fixedCosts.fixedCosts || []

    useEffect(() => {
        setTotal(getTotalFixedCosts());
        setTotalActive(getTotalActive());
        setTotalDisabled(getTotalDisabled());
    }, [state.fixedCosts.fixedCosts]);


    useEffect(() => {
        dispatch(getFixedCostsAction())
    }, []);

    const getTotalFixedCosts = () => {
        return fixedCosts?.reduce((acc, item) => {
            acc += item.expense;
            return acc;
        }, 0);
    };

    const getTotalActive = () => {
        return fixedCosts?.reduce((acc, item) => {
            if (item.active) acc += item.expense;
            return acc;
        }, 0);
    };

    const getTotalDisabled = () => {
        return fixedCosts?.reduce((acc, item) => {
            if (!item.active) acc += item.expense;
            return acc;
        }, 0);
    };

    const addToThisMonth = (item: UtilityI) => {
        fixedCostsProvider
            .update(item?.uuid, {
                status: "IN_PROGRESS",
            })
            .then((data) => {
            })
            .catch((error) => error);
        utilitiesProvider
            .postItem(item)
            .then((data) => {
                sweetAlert.alert("Done!", "Added to this month", "success");
            })
            .catch((error) => error);
    };

    const removeItem = async (item: UtilityI) => {
        dispatch(removeFixedCostsAction(item?.uuid))
    };

    const disabledItem = (item: UtilityI) => {
        dispatch(disabledItemAction(item))
    };

    const showModalEdit = (item: UtilityI) => {
        setDataModalUtility(item);
        setShowModal(!showModal);
    };

    return (
        <>
            <div className="container">
                {/* <FormBudget></FormBudget> */}
                <div className="row mb-5">
                    <div className="col-sm-4">
                        <CardMini amount={currencyFormat(total)} title="Fixed costs" />
                    </div>
                    <div className="col-sm-4">
                        <CardMini
                            amount={currencyFormat(totalActive)}
                            title="Total active"
                        />
                    </div>
                    <div className="col-sm-4">
                        <CardMini
                            amount={currencyFormat(totalDisabled)}
                            title="Total disabled"
                        />
                    </div>
                </div>
                <Box
                    title="Fixed costs"
                    rightSection={<div className="d-flex align-center-center">
                        <Button
                            action={() => {
                                setShowModal(true)
                                setDataModalUtility(null)
                            }}
                            bgClass={"primary"}
                            type={"button"}
                            loading={false}
                            size="sm"
                        >
                            Add new
                        </Button>
                        <Button
                            action={() => { }}
                            bgClass={"danger"}
                            type={"button"}
                            loading={showLoadingAddToMoth}
                            size="sm"
                        >
                            Add to month
                        </Button>
                    </div>}
                >
                    <Table headItems={headItems} bodyItems={fixedCosts} />
                </Box>
            </div>


            {/* modals */}
            {showModal &&
                <ModalFixedCosts
                    active={showModal}
                    data={dataModalUtility}
                    toggle={() => {
                        setShowModal(false)
                    }} />
            }
        </>
    );
};
FixedCosts.getLayout = (page: ReactElement) => (
    <Layout>
        {page}
    </Layout >
)


export default FixedCosts;
