import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import sweetAlert from '../../../helpers/alerts/sweetAlert.helper';
import { currencyFormat } from '../../../helpers/currency.helper';
import { getFilterByStatus } from '../../../helpers/status.helper';
import { UtilityI } from '../../../interfaces/utility/utility.interface';
import fixedCostsProvider from '../../../providers/fixed-costs/fixed-costs.provider';
import { disabledItemAction, getFixedCostsAction, removeFixedCostsAction } from '../../../redux/actions/fixed-costs.action';
import { headItemsFixedCosts } from '../../../settings/fixed-costs/header-fixed-costs';
import { tabsSettings } from '../../../settings/manage/tabs.settings';
import Box from '../../common/box';
import Button from '../../common/button';
import CardMini from '../../common/card/CardMini';
import Table from '../../common/table';
import Tabs from '../../common/tabs';
import ModalFixedCosts from './modals';

const FixedCosts = () => {

    const [total, setTotal] = useState(0);
    const [totalActive, setTotalActive] = useState(0);
    const [totalDisabled, setTotalDisabled] = useState(0);
    const [dataModalUtility, setDataModalUtility] = useState<UtilityI | null>(
        null
    );
    const [tab, setTab] = useState<number>(0);

    // shows
    const [showModal, setShowModal] = useState(false);
    // loadings
    const [showLoadingAddToMoth, setShowLoadingAddToMoth] = useState(false);

    // stores
    const { fixedCosts: { fixedCosts } } = useSelector((state: any) => state)

    const dispatch = useDispatch()

    useEffect(() => {
        setTotal(getTotalFixedCosts());
        setTotalActive(getTotalActive());
        setTotalDisabled(getTotalDisabled());
    }, [fixedCosts]);


    useEffect(() => {
        dispatch(getFixedCostsAction())
    }, []);

    const getTotalFixedCosts = () => {
        return fixedCosts?.reduce((acc: any, item: any) => {
            acc += item.expense;
            return acc;
        }, 0);
    };

    const getTotalActive = () => {
        return fixedCosts?.reduce((acc: any, item: any) => {
            if (item.active) acc += item.expense;
            return acc;
        }, 0);
    };

    const getTotalDisabled = () => {
        return fixedCosts?.reduce((acc: any, item: any) => {
            if (!item.active) acc += item.expense;
            return acc;
        }, 0);
    };

    const addToThisMonth = (item: UtilityI) => {
        fixedCostsProvider
            .update(item?.uuid, { status: "IN_PROGRESS", inMonth: true })
            .then((res) => {
                if (res?.error) return sweetAlert.toast("Error", res.error.message, "error");
                sweetAlert.alert("Done!", "Added to this month", "success");
            })
            .catch((error) => error);
    };

    const addToMonth = () => {
        Promise.all(
            fixedCosts?.filter((item: UtilityI) => item.active)
                .map(async (item: UtilityI) => {
                    return await fixedCostsProvider.update(item.uuid, { inMonth: true, status: "IN_PROGRESS" });
                }))
            .then((data: any) => {
                if (data?.error) return sweetAlert.toast("Error", data.error.message, "error");
                sweetAlert.alert("Success", "Fixed costs added to this month", "success");
            })
    }

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
                    customClassLeftSection='col-lg-8'
                    customClassRightSection='col-lg-4'
                    leftSection={
                        <Tabs
                            tabsSettings={tabsSettings}
                            setActiveTab={setTab}
                            activeTab={tab}
                        />
                    }
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
                            action={addToMonth}
                            bgClass={"danger"}
                            type={"button"}
                            loading={showLoadingAddToMoth}
                            size="sm"
                        >
                            Add to month
                        </Button>
                    </div>}
                >
                    <Table
                        headItems={headItemsFixedCosts({ addToThisMonth, disabledItem, removeItem, showModalEdit })}
                        bodyItems={fixedCosts?.filter((item: any) => getFilterByStatus?.(tab)?.includes(item?.status))}
                    />
                </Box>
            </div>

            {showModal &&
                <ModalFixedCosts
                    active={showModal}
                    data={dataModalUtility}
                    setToggle={() => {
                        setShowModal(false);
                    }} />
            }
        </>
    )
}

export default FixedCosts