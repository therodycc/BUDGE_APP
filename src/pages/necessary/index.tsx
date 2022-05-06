import { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "../../components/common/box";
import Button from "../../components/common/button";
import CardMini from "../../components/common/card/CardMini";
import Table from "../../components/common/table";
import Layout from "../../components/layout";
import ModalNecessary from "../../components/pages/necessary/modals";
import sweetAlert from "../../helpers/alerts/sweetAlert.helper";
import { currencyFormat } from "../../helpers/currency.helper";
import { NecessaryI } from "../../interfaces/necessary/necessary.interface";
import { UtilityI } from "../../interfaces/utility/utility.interface";
import necessaryProvider from "../../providers/necessary/necessary.provider";
import utilitiesProvider from "../../providers/utilities/utilities.provider";
import { getNecessaryAction, removeNecessaryAction } from "../../redux/actions/necessary.action";

const Necessary = () => {
    const dispatch = useDispatch()
    const state = useSelector((state: any) => state)
    const [necessary, setNecessary] = useState<Array<any>>([]);
    const [totalNecessary, setTotalNecessary] = useState(0);
    const [totalCompleted, setTotalCompleted] = useState(0);
    const [totalMissing, setTotalMissing] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [dataModalUtility, setDataModalUtility] = useState<NecessaryI | null>(
        null
    );

    const [headItems, setHeadItems] = useState([
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
    ]);

    useEffect(() => {
        dispatch(getNecessaryAction());
    }, []);
    useEffect(() => {
        setNecessary(state.necessary.necessary);
    }, [state.necessary.necessary]);

    useEffect(() => {
        setTotalNecessary(getTotalNecessary());
        setTotalCompleted(getTotalCompleted());
    }, [necessary]);

    useEffect(() => {
        setTotalMissing(getTotalMissing());
    }, [totalCompleted, totalMissing]);


    const addToThisMonth = (item: UtilityI) => {
        necessaryProvider
            .update(item.id, {
                status: "In progress",
            })
            .then((data) => {
            })
            .catch((error) => error);

        utilitiesProvider
            .postItem(item)
            .then((res) => {
                if (res.error) return sweetAlert.alert("Error", res.error.message, "error");
                sweetAlert.alert("Done!", "Added to this month", "success");
            })
            .catch((error) => error);
    };

    const removeItem = async (item: NecessaryI) => {
        dispatch(removeNecessaryAction(item.uuid || ""))
    };

    const getTotalNecessary = () => {
        return necessary?.reduce((acc, item) => {
            acc += +item.expense;
            return acc;
        }, 0);
    };

    const getTotalCompleted = () => {
        return necessary?.reduce((acc, item) => {
            if (item.status === "COMPLETED") acc += item.expense;
            if (item.status === "IN_PROGRESS") acc += item.paidOut;

            return acc;
        }, 0);
    };

    const getTotalMissing = () => {
        return totalNecessary - totalCompleted;
    };

    const showModalEdit = (item: UtilityI) => {
        setDataModalUtility(item);
        setShowModal(!showModal);
    };

    return (
        <>
            <div className="container">
                <div className="row mb-5">
                    <div className="col-sm-4">
                        <CardMini
                            amount={currencyFormat(totalNecessary)}
                            title="Necessary"
                        />
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
                    title="Necessary"
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
                    <Table headItems={headItems} bodyItems={necessary} />
                </Box>
            </div>

            {showModal && (
                <ModalNecessary
                    active={showModal}
                    toggle={() => {
                        setShowModal(false)
                    }}
                    data={dataModalUtility} />
            )}
        </>
    );
};
Necessary.getLayout = (page: ReactElement) => (
    <Layout>
        {page}
    </Layout >
)

export default Necessary;
