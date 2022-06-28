import Script from 'next/script';
import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import sweetAlert from '../../../helpers/alerts/sweetAlert.helper';
import { currencyFormat } from '../../../helpers/currency.helper';
import { createTablePdf } from '../../../helpers/pdf/create-table-pdf';
import { ManageCardsDataI } from '../../../interfaces/manage/manage.interface';
import { UtilityI } from '../../../interfaces/utility/utility.interface';
import manageProvider from '../../../providers/utilities/utilities.provider';
import { getManageAction, removeAllManageAction, removeManageAction } from '../../../redux/actions/manage.action';
import { getProfitsAction } from '../../../redux/actions/profits.action';
import Box from '../../common/box';
import Button from '../../common/button';
import Card from '../../common/card';
import CardAmountText from '../../common/card/card-amount-text';
import Table from '../../common/table';
import Tabs from '../../common/tabs';
import { manageCardsData, manageCategories } from './cards-settings/manage-card';
import { headersManageItems } from './headers/manage-headers';
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
    const [dataModalUtility, setDataModalUtility] = useState<UtilityI | null>(null);

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
        dispatch(removeManageAction(item?.uuid, item?.type?.name));
    };

    const showModalEdit = (item: UtilityI) => {
        setDataModalUtility(item);
        setShowModal(!showModal);
    };

    const resetTableData = async () => {
        const result = await manageProvider.deleteAllManage(manage?.map((item: UtilityI) => item.uuid));
        if (result.error) return sweetAlert.alert("Error", result?.error?.message, "error");
        sweetAlert.toast("Success", 'All items was deleted', 'success');
        dispatch(removeAllManageAction());
    }

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
                    <div className="col-lg-8 row">
                        {manageCardsData({ entry, paidOut, remaining, pending }).map((item: ManageCardsDataI, index: number) => (
                            <Card
                                title={item?.title}
                                description={item?.description}
                                icon={item?.icon}
                                amount={currencyFormat(item?.amount)}
                                bgIcon={item?.bgIcon}
                            />
                        ))}
                    </div>
                    <div className="col-lg-4">
                        {
                            manageCategories({ debt, fixedCosts, personal, family, voluntary, wishes }).map((item: ManageCardsDataI, index: number) => (
                                <CardAmountText
                                    title={item?.title}
                                    description={currencyFormat(item.amount)}
                                />
                            ))
                        }
                    </div>
                </div>
                <Box
                    title={<Tabs />}
                    rightSection={
                        <React.Fragment>
                            <Button
                                bgClass={"danger"}
                                type={"button"}
                                loading={false}
                                action={handleExportData}
                            >
                                Export
                            </Button>
                            <Button
                                action={resetTableData}
                                bgClass={"info"}
                                type={"button"}
                                loading={false}
                            >
                                Reset
                            </Button>
                        </React.Fragment>
                    }
                >
                    <div id="test">
                        <Table headItems={headersManageItems({ removeItem, showModalEdit })} bodyItems={manage} />
                    </div>
                </Box>
            </div>
            {dataModalUtility && showModal && (
                <ModalManage
                    active={false}
                    toggle={() => setShowModal(false)}
                    data={{
                        type: dataModalUtility.type.name,
                        expense: dataModalUtility?.expense,
                        uuid: dataModalUtility?.uuid
                    }}
                />
            )}
        </>
    );
}

export default Manage