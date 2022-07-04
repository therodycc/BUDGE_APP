import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import sweetAlert from '../../../helpers/alerts/sweetAlert.helper';
import { currencyFormat } from '../../../helpers/currency.helper';
import { getFilterByStatus } from '../../../helpers/status.helper';
import { UtilityI } from '../../../interfaces/utility/utility.interface';
import debtProvider from '../../../providers/debt/debt.provider';
import { getDebtsAction, removeDebtsAction } from '../../../redux/actions/debts.action';
import { headTableDebts } from '../../../settings/debts/headers-debts';
import { tabsSettings } from '../../../settings/manage/tabs.settings';
import Box from '../../common/box';
import Button from '../../common/button';
import CardMini from '../../common/card/CardMini';
import Table from '../../common/table';
import Tabs from '../../common/tabs';
import ModalDebts from './modals';

const Debts = () => {
    const [totalDebts, setTotalDebts] = useState(0);
    const [totalCompleted, setTotalCompleted] = useState(0);
    const [totalMissing, setTotalMissing] = useState(0);
    const [showModal, setShowModal] = useState(false)
    const [dataModalUtility, setDataModalUtility] = useState<UtilityI | null>(null);
    const [tab, setTab] = useState<number>(0);

    const dispatch = useDispatch()
    const { debts: { debts } } = useSelector((state: any) => state)

    useEffect(() => {
        dispatch(getDebtsAction())
    }, [dispatch, getDebtsAction]);


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

    useEffect(() => {
        setTotalDebts(getTotalDebts());
        setTotalCompleted(getTotalCompleted());
    }, [debts, getTotalDebts, getTotalCompleted]);

    const addToThisMonth = (item: UtilityI) => {
        debtProvider.update(item.uuid, { status: 'IN_PROGRESS', inMonth: true })
            .then(res => {
                if (res?.error) return sweetAlert.toast("Error", res.error.message, "error");
                sweetAlert.alert("Done!", "Added to this month", "success");
            })
    };

    useEffect(() => {
        setTotalMissing(getTotalMissing());
    }, [totalCompleted, totalMissing, getTotalMissing]);

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
                    customClassLeftSection='col-lg-8'
                    customClassRightSection='col-lg-4'
                    leftSection={
                        <Tabs
                            tabsSettings={tabsSettings}
                            setActiveTab={setTab}
                            activeTab={tab}
                        />
                    }
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
                    <Table
                        headItems={headTableDebts({ addToThisMonth, removeItem, showModalEdit })}
                        bodyItems={debts?.filter((item: any) => getFilterByStatus?.(tab)?.includes(item?.status))} />
                </Box>
            </div>
            {showModal && (
                <ModalDebts
                    active={showModal}
                    setToggle={() => {
                        setShowModal(false)
                    }}
                    data={dataModalUtility} />
            )}
        </>
    );
}

export default Debts