import Script from 'next/script';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import sweetAlert from '../../../helpers/alerts/sweetAlert.helper';
import { currencyFormat } from '../../../helpers/currency.helper';
import { createTablePdf } from '../../../helpers/pdf/create-table-pdf';
import { StatusType } from '../../../interfaces/utility/utilily.type';
import { UtilityI } from '../../../interfaces/utility/utility.interface';
import { getManageAction, removeManageAction } from '../../../redux/actions/manage.action';
import { getProfitsAction } from '../../../redux/actions/profits.action';
import Box from '../../common/box';
import Button from '../../common/button';
import ButtonGroup from '../../common/button/button-group';
import Card from '../../common/card';
import DTProfileTable from '../../common/dt-profile-table';
import Table from '../../common/table';
import Tabs from '../../common/tabs';
import TrafficLights from '../../common/traffic-lights';
import { ButtonGroupDataManage } from './buttons-settings';
import ModalManage from './modals';

const Manage = () => {
    // store
    const { manage: { manage }, profits: { profits } } = useSelector((state: any) => state);
    const dispatch = useDispatch();

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
    }, [manage, profits]);

    const getProfits = () => {
        return profits?.reduce((acc: number, item: any) => {
            if (item?.active) acc += item.amount;
            return acc;
        }, 0);
    };

    const getPending = () => {
        return manage?.reduce((acc: number, item: any) => {
            acc += item.expense - item.paidOut;
            return acc;
        }, 0);
    };

    const getDebt = () => {
        return manage?.reduce((acc: number, item: any) => {
            if (item.category === "debt") {
                acc += item.expense;
            }
            return acc;
        }, 0);
    };

    const getFixedCosts = () => {
        return manage?.reduce((acc: number, item: any) => {
            if (item.category === "fixedCosts") {
                acc += item.expense;
            }
            return acc;
        }, 0);
    };
    const getPersonal = () => {
        return manage?.reduce((acc: number, item: any) => {
            if (item.category === "personal") {
                acc += item.expense;
            }
            return acc;
        }, 0);
    };
    const getFamily = () => {
        return manage?.reduce((acc: number, item: any) => {
            if (item.category === "family") {
                acc += item.expense;
            }
            return acc;
        }, 0);
    };

    const getVoluntary = () => {
        return manage?.reduce((acc: number, item: any) => {
            if (item.category === "voluntary") {
                acc += item.expense;
            }
            return acc;
        }, 0);
    };
    const getRemaining = () => {
        return manage?.reduce((acc: number, item: any) => {
            acc -= item.expense;
            return acc;
        }, entry);
    };
    const getPaidOut = () => {
        return manage?.reduce((acc: number, item: any) => {
            acc += item.paidOut;
            return acc;
        }, 0);
    };
    const getWishes = () => {
        return manage?.reduce((acc: number, item: any) => {
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
            render: ({ item }: any) => { return (<DTProfileTable name={item?.name} image={item?.img} expense={item?.expense} paidOut={item?.paidOut} category={item?.category} />); },

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
        // { title: "Paid Out", render: ({ item }: any) => { return <PayItemOn /> } },
        {
            title: "Actions",
            render: ({ item }: any) => { return (<TrafficLights status={item.status as StatusType} />); },
        },
        {
            title: "Actions",
            render: ({ item }: any) => { return (<ButtonGroup buttonsGroupsData={ButtonGroupDataManage({ action1: () => showModalEdit(item), action2: () => removeItem(item) })} />); },
        }]);

    const showModalEdit = (item: UtilityI) => {
        setDataModalUtility(item);
        setShowModal(!showModal);
    };

    const handleExportData = async () => {
        const confirm = await sweetAlert.question('Do you want to export data?', 'warning', '');
        if (!confirm) return
        createTablePdf(manage, entry, pending, remaining)
        const result = await fetch('http://localhost:8000/reports', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                [new Date().toLocaleDateString()]: manage
            })
        });
        const data = await result.json();
        if (!data) return
        sweetAlert.toast(data.message, '', 'success');
    }
    return (
        <>
            <Script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></Script>
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
                    title={<Tabs />}
                    rightSection={
                        <>
                            <Button
                                bgClass={"danger"}
                                type={"button"}
                                loading={false}
                                action={handleExportData}
                            >
                                Export
                            </Button>
                            <Button
                                action={() => { }}
                                bgClass={"info"}
                                type={"button"}
                                loading={false}
                            >
                                Reset
                            </Button>
                        </>
                    }
                >
                    <div id="test">
                        <Table headItems={headItems} bodyItems={manage} />
                    </div>
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
}

export default Manage