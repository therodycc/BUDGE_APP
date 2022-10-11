import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import sweetAlert from '../../../helpers/alerts/sweetAlert.helper';
import { currencyFormat } from '../../../helpers/currency.helper';
import { getFilterByStatus } from '../../../helpers/status.helper';
import useCalcCategory from '../../../hooks/useCalcCategory';
import { UtilityI } from '../../../interfaces/utility/utility.interface';
import debtProvider from '../../../providers/debt/debt.provider';
import { addDebts, removeDebt, updateDebt } from '../../../redux-toolkit/slices/debts.slice';
import { RootState } from '../../../redux-toolkit/store';
import { headTableDebts } from '../../../settings/debts/headers-debts';
import { tabsSettings } from '../../../settings/manage/tabs.settings';
import Box from '../../common/box';
import Button from '../../common/button';
import CardMini from '../../common/card/CardMini';
import Table from '../../common/table';
import Tabs from '../../common/tabs';
import ModalDebts from './modals';

const Debts = () => {
    const [showModal, setShowModal] = useState(false)
    const [dataModalUtility, setDataModalUtility] = useState<UtilityI | null>(null);
    const [tab, setTab] = useState<number>(0);

    const dispatch = useDispatch()

    const { debts } = useSelector((state: RootState) => state)

    const { total: totalDebts, totalCompleted, totalMissing } = useCalcCategory({
        valueToCalc: debts.result
    })

    const getAllDebts = async () => {
        const res = await debtProvider.getAll()
        if (res.error) return sweetAlert.toast("", res.error.message, "error");
        dispatch(addDebts({ result: res.data }));
    }

    useEffect(() => {
        getAllDebts()
    }, []);

    const addToThisMonth = (item: UtilityI) => {
        debtProvider.update(item.uuid, { inMonth: true })
            .then(res => {
                if (res?.error) return sweetAlert.toast("Error", res.error.message, "error");
                dispatch(updateDebt({ debt: { uuid: item.uuid, inMonth: true } }))
            })
    };

    const removeItem = async (item: UtilityI) => {
        const confirm = await sweetAlert.question("Are you sure?", "warning");
        if (!confirm) return;
        const res = await debtProvider.remove(item.uuid)
        if (res.error) return sweetAlert.alert("Error", res?.error?.message, "error");
        dispatch(removeDebt({ uuid: item?.uuid }))
        sweetAlert.alert("Success", "Done!", "success");
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
                        bodyItems={debts?.result?.filter((item: any) => getFilterByStatus?.(tab)?.includes(item?.status)) || []} />
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