import { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "../../components/common/box";
import Button from "../../components/common/button";
import Card from "../../components/common/card/Index";
import Table from "../../components/common/table/Index";
import Layout from "../../components/layout";
import ModalManage from "../../components/pages/manage/modals";
import sweetAlert from "../../helpers/alerts/sweetAlert.helper";
import { currencyFormat } from "../../helpers/currency.helper";
import { UtilityI } from "../../interfaces/utility/utility.interface";
import manageProvider from "../../providers/reports/reports.provider";
import {
    getManageAction,
    removeManageAction
} from "../../redux/actions/manage.action";
import { getProfitsAction } from "../../redux/actions/profits.action";
const Manage = () => {
    // store
    const state = useSelector((state: any) => state);
    const dispatch = useDispatch();

    const [utilities, setUtilities] = useState<Array<any>>([]);
    const [profits, setProfits] = useState<Array<any>>([]);

    const [entry, setEntry] = useState(0);
    const [pending, setPending] = useState(0);
    const [debt, setDebt] = useState(0);
    const [paidOut, setPaidOut] = useState(0);
    const [fixedCosts, setFixedCosts] = useState(0);
    const [personal, setPersonal] = useState(0);
    const [family, setFamily] = useState(0);
    const [voluntary, setVoluntary] = useState(0);
    const [remaining, setRemaining] = useState(0);
    const [wishes, setWishes] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [dataModalUtility, setDataModalUtility] = useState<UtilityI | null>(
        null
    );

    useEffect(() => {
        dispatch(getProfitsAction());
        dispatch(getManageAction());
    }, []);

    useEffect(() => {
        if (!state.profits.profits) return
        setProfits(state.profits.profits);
    }, [state.profits.profits]);
    useEffect(() => {
        if (!state.manage.manage) return
        setUtilities(state.manage.manage);
    }, [state.manage.manage]);

    useEffect(() => {
        setPending(getPending());
        setDebt(getDebt());
        setFamily(getFamily());
        setFixedCosts(getFixedCosts());
        setPersonal(getPersonal());
        setVoluntary(getVoluntary());
        setRemaining(getRemaining());
        setWishes(getWishes());
        setEntry(getProfits());
        setPaidOut(getPaidOut());
    }, [utilities, profits]);

    const getProfits = () => {
        return profits?.reduce((acc: number, item: any) => {
            if (item?.active) acc += item.amount;
            return acc;
        }, 0);
    };

    const getPending = () => {
        return utilities?.reduce((acc, item) => {
            acc += item.expense - item.paidOut;
            return acc;
        }, 0);
    };

    const getDebt = () => {
        return utilities?.reduce((acc, item) => {
            if (item.category === "debt") {
                acc += item.expense;
            }
            return acc;
        }, 0);
    };

    const getFixedCosts = () => {
        return utilities?.reduce((acc, item) => {
            if (item.category === "fixedCosts") {
                acc += item.expense;
            }
            return acc;
        }, 0);
    };
    const getPersonal = () => {
        return utilities?.reduce((acc, item) => {
            if (item.category === "personal") {
                acc += item.expense;
            }
            return acc;
        }, 0);
    };
    const getFamily = () => {
        return utilities?.reduce((acc, item) => {
            if (item.category === "family") {
                acc += item.expense;
            }
            return acc;
        }, 0);
    };

    const getVoluntary = () => {
        return utilities?.reduce((acc, item) => {
            if (item.category === "voluntary") {
                acc += item.expense;
            }
            return acc;
        }, 0);
    };
    const getRemaining = () => {
        return utilities?.reduce((acc, item) => {
            acc -= item.expense;
            return acc;
        }, entry);
    };
    const getPaidOut = () => {
        return utilities?.reduce((acc, item) => {
            acc += item.paidOut;
            return acc;
        }, 0);
    };
    const getWishes = () => {
        return utilities?.reduce((acc, item) => {
            if (item.category === "wishes") {
                acc += item.expense;
            }
            return acc;
        }, 0);
    };

    const removeItem = async (item: UtilityI) => {
        dispatch(removeManageAction(item?.uuid));
    };

    const [headItems, setHeadItems] = useState([
        {
            title: "Title",
            render: ({ item }: any) => {
                return (
                    <div className="d-flex px-3 py-1">
                        <div>
                            <img
                                src={
                                    item?.img ||
                                    "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/blue-shoe.jpg"
                                }
                                className="avatar me-3"
                                alt="image"
                            />
                        </div>
                        <div className="d-flex flex-column justify-content-center">
                            <h6 className="mb-0 text-sm">{item?.name}</h6>
                            <p className="text-sm font-weight-normal text-secondary mb-0">
                                <span
                                    className={`text-${item?.expense - item?.paidOut === 0 ? "success" : "danger"
                                        } font-weight-bold mx-1`}
                                >
                                    {currencyFormat(item?.expense - item?.paidOut)}
                                </span>
                                {item?.category}
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
                        <span>{currencyFormat(item?.expense)}</span>
                    </>
                );
            },
        },
        /*    {
                    title: 'To pay',
                    render: ({ item }) => {
                        let toPay: number = 0;
        
                        const handleChange = (value: string) => {
                            toPay = parseInt(value)
                        }
        
                        const handleClickToPay = () => {
                            if (toPay > item?.expense) {
                                return sweetAlert.alert('', 'La cantidad sobrepasa el valor', 'error');
                            }
                            utilitiesProvider.update(item?.id, {
                                paidOut: item?.paidOut + toPay
                            })
                                .then(data => {
                                    sweetAlert.alert('Done!', '', 'success');
                                })
                                .catch(error => error)
                        }
        
                        return (
                            <>
                                <div className='row'>
                                    <div className='col-md-8'>
        
                                        <InputText
                                            name={item?.title}
                                            placeholder='To pay'
                                            onChange={(e: any) => { handleChange(e.target.value) }}
                                            type='number'
                                            maxLength={item?.expense.length}
                                        />
                                    </div>
                                    <div className='col-md-4'>
                                        <button
                                            className='btn btn-success btn-sm'
                                            onClick={() => { handleClickToPay() }}
                                        >
                                            <i className="fas fa-plus"></i>
                                        </button>
                                    </div>
                                </div>
                            </>
                        )
                    }
                }, */
        {
            title: "Actions",
            render: ({ item }: any) => {
                return (
                    <>
                        <div className="btn-group">
                            <span
                                className={` text-${item?.status === "PENDING" ? "danger" : "light"
                                    } display-8`}
                            >
                                {" "}
                                <i className="fas fa-circle"></i>
                            </span>
                            <span
                                className={` text-${item?.status === "IN_PROGRESS" ? "warning" : "light"
                                    } display-8 mx-2`}
                            >
                                {" "}
                                <i className="fas fa-circle"></i>
                            </span>
                            <span
                                className={` text-${item?.status === "COMPLETED" ? "success" : "light"
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

    const showModalEdit = (item: UtilityI) => {
        setDataModalUtility(item);
        setShowModal(!showModal);
    };

    const handleExportData = async () => {
        manageProvider
            .exportPDF({
                [new Date().toLocaleDateString()]: utilities,
            })
            .then((res) => {
                sweetAlert.toast("Success", "Successfully exported", "success");
            })
            .catch((err) => err);
    };
    
    return (
        <>
            <div className="container">
                <div className="row mt-5">
                    <Card
                        title="Entry"
                        description=""
                        icon={<i className="fas fa-dollar-sign"></i>}
                        amount={currencyFormat(entry)}
                        bgIcon="success"
                    />
                    <Card
                        title="Pending"
                        description=""
                        icon={<i className="fa fa-check"></i>}
                        amount={currencyFormat(pending)}
                        bgIcon="warning"
                    />
                    <Card
                        title="Paid Out"
                        description=""
                        icon={<i className="fa fa-money"></i>}
                        amount={currencyFormat(paidOut)}
                        bgIcon="info"
                    />
                    <Card
                        title="Fixed costs"
                        description=""
                        icon={<i className="fa fa-check"></i>}
                        amount={currencyFormat(fixedCosts)}
                        bgIcon="dark"
                    />
                    <Card
                        title="Personal"
                        description=""
                        icon={<i className="fa fa-check"></i>}
                        amount={currencyFormat(personal)}
                        bgIcon="dark"
                    />
                    <Card
                        title="Family"
                        description=""
                        icon={<i className="fa fa-check"></i>}
                        amount={currencyFormat(family)}
                        bgIcon="dark"
                    />
                    <Card
                        title="Voluntary"
                        description=""
                        icon={<i className="fa fa-check"></i>}
                        amount={currencyFormat(voluntary)}
                        bgIcon="dark"
                    />
                    <Card
                        title="Remaining"
                        description=""
                        icon={<i className="fa fa-check"></i>}
                        amount={currencyFormat(remaining)}
                        bgIcon="dark"
                    />
                    <Card
                        title="Wishes"
                        description=""
                        icon={<i className="fa fa-check"></i>}
                        amount={currencyFormat(wishes)}
                        bgIcon="dark"
                    />
                </div>
                <Box
                    title="Utilities"
                    rightSection={
                        <>
                            <Button
                                action={handleExportData}
                                bgClass={"danger"}
                                type={"button"}
                                loading={false}
                            >
                                Export
                            </Button>
                        </>
                    }
                >
                    <Table headItems={headItems} bodyItems={utilities} />
                </Box>
            </div>
            {dataModalUtility && showModal && (
                <ModalManage
                    active={false}
                    toggle={() => setShowModal(false)}
                    data={dataModalUtility} />
            )}
        </>
    );
};
Manage.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            {page}
        </Layout >
    )
}

export default Manage;
