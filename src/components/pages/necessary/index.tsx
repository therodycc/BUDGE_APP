import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import sweetAlert from '../../../helpers/alerts/sweetAlert.helper';
import { currencyFormat } from '../../../helpers/currency.helper';
import { getFilterByStatus } from '../../../helpers/status.helper';
import useCalcCategory from '../../../hooks/useCalcCategory';

import { NecessaryI } from '../../../interfaces/necessary/necessary.interface';
import { UtilityI } from '../../../interfaces/utility/utility.interface';
import necessaryProvider from '../../../providers/necessary/necessary.provider';
import { getNecessaryAction, removeNecessaryAction } from '../../../redux/actions/necessary.action';
import { tabsSettings } from '../../../settings/manage/tabs.settings';
import { headersModalNecessary } from '../../../settings/necessary/headers-necessary';
import Box from '../../common/box';
import Button from '../../common/button';
import CardMini from '../../common/card/CardMini';
import Table from '../../common/table';
import Tabs from '../../common/tabs';
import ModalNecessary from './modals';

const Necessary = () => {
    const dispatch = useDispatch()
    const { necessary: { necessary } } = useSelector((state: any) => state)

    const [showModal, setShowModal] = useState(false);
    const [dataModalUtility, setDataModalUtility] = useState<NecessaryI | null>(
        null
    );
    const [tab, setTab] = useState(0);

    useEffect(() => {
        dispatch(getNecessaryAction());
    }, []);

    const { totalCompleted, totalMissing, total: totalNecessary } = useCalcCategory({
        valueToCalc: necessary
    })


    const addToThisMonth = (item: UtilityI) => {
        necessaryProvider
            .update(item.uuid, { status: "IN_PROGRESS", inMonth: true })
            .then((res) => {
                if (res.error) return sweetAlert.toast("Error", res.error.message, "error");
                sweetAlert.alert("Done!", "Added to this month", "success");
            })
            .catch((error) => error);
    };

    const removeItem = async (item: NecessaryI) => {
        dispatch(removeNecessaryAction(item.uuid || ""))
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
                        headItems={headersModalNecessary({ addToThisMonth, removeItem, showModalEdit })}
                        bodyItems={necessary?.filter((item: any) => getFilterByStatus?.(tab)?.includes(item?.status))} />
                </Box>
            </div>

            {showModal && (
                <ModalNecessary
                    active={showModal}
                    setToggle={() => {
                        setShowModal(false)
                    }}
                    data={dataModalUtility} />
            )}
        </>
    );
}

export default Necessary 