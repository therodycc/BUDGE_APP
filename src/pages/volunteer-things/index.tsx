import { ReactElement, useEffect, useState } from "react";
import Box from "../../components/common/box";
import CardMini from "../../components/common/card/CardMini";
import Table from "../../components/common/table/Index";
import Layout from "../../components/layout";
import FormBudget from "../../components/pages/form-budget/Index";
import { currencyFormat } from "../../helpers/currency.helper";
import sweetAlert from "../../helpers/alerts/sweetAlert.helper";
import { UtilityI } from "../../interfaces/utility/utility.interface";
import utilitiesProvider from "../../providers/utilities/utilities.provider";
import VolunteerThingsProvider from "../../providers/volunteer-things/volunteer-things.provider";
import { VolunteerThingsI } from "../../interfaces/volunteer-things/volunteer-things.interface";
import { useDispatch, useSelector } from "react-redux";
import {
    getVolunteerThingsAction,
    removeVolunteerThingsAction,
} from "../../redux/actions/volunteer-things.action";
import ModalVolunteerThings from "../../components/pages/volunteer-things/modals";
import Button from "../../components/common/button";

const VolunteerThings = () => {
    const state = useSelector((state: any) => state.volunteerThings);

    const [volunteerThings, setVolunteerThings] = useState<Array<any>>([]);
    const [totalVolunteerThings, setTotalVolunteerThings] = useState<number>(0);
    const [totalCompleted, setTotalCompleted] = useState<number>(0);
    const [totalMissing, setTotalMissing] = useState<number>(0);
    const [showModal, setShowModal] = useState(false);
    const [dataModalUtility, setDataModalUtility] = useState<UtilityI | null>(
        null
    );
    const dispatch = useDispatch();

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
            title: "To",
            render: ({ item }: any) => {
                return (
                    <>
                        <span>{item?.to}</span>
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
        setTotalVolunteerThings(getTotalVolunteerThings());
        setTotalCompleted(getTotalCompleted());
    }, [volunteerThings]);

    useEffect(() => {
        setTotalMissing(getTotalMissing());
    }, [totalCompleted, totalMissing]);

    useEffect(() => {
        dispatch(getVolunteerThingsAction());
    }, []);

    useEffect(() => {
        setVolunteerThings(state.volunteerThings);
    }, [state.volunteerThings]);

    const getTotalVolunteerThings = () => {
        return volunteerThings?.reduce((acc, item) => {
            acc += item.expense;
            return acc;
        }, 0);
    };

    const getTotalCompleted = () => {
        return volunteerThings?.reduce((acc, item) => {
            if (item.status === "COMPLETED") acc += item.expense;
            if (item.status === "IN PROGRESS") acc += item.paidOut;

            return acc;
        }, 0);
    };

    const getTotalMissing = () => {
        return totalVolunteerThings - totalCompleted;
    };

    const addToThisMonth = (item: VolunteerThingsI) => {
        VolunteerThingsProvider.update(item.uuid || "", {
            status: "In progress",
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

    const removeItem = async (item: VolunteerThingsI) => {
        dispatch(removeVolunteerThingsAction(item.uuid || ""));
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
                            amount={currencyFormat(totalVolunteerThings)}
                            title="Total Volunteer Things"
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
                    title="VolunteerThings"
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
                    <Table headItems={headItems} bodyItems={volunteerThings} />
                </Box>
            </div>

            {
                showModal && (
                    <ModalVolunteerThings
                        active={showModal}
                        data={dataModalUtility}
                        toggle={() => {
                            setShowModal(false);
                        }}
                    />
                )
            }
        </>
    );
};
VolunteerThings.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            {page}
        </Layout >
    )
}

export default VolunteerThings;
