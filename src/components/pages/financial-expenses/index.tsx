import { useEffect, useState } from 'react';
import { currencyFormat } from '../../../helpers/currency.helper';
import useCalcCategory from '../../../hooks/useCalcCategory';
import { getAllFinancialExpenses } from '../../../redux-toolkit/slices/financial-expense/financial-expense.actions';
import { financialExpenseSelector } from '../../../redux-toolkit/slices/financial-expense/financial-expense.selector';
import { useDispatch, useSelector } from '../../../redux-toolkit/store';
import { headTableFinancialExpenses } from '../../../settings/financial-expenses/headers-financial-expenses';
import { tabsSettings } from '../../../settings/manage/tabs.settings';
import Box from '../../common/box';
import Button from '../../common/button';
import CardMini from '../../common/card/CardMini';
import Table from '../../common/table';
import Tabs from '../../common/tabs';

export const FinancialExpenses = () => {
    const [tab, setTab] = useState<number>(0);
    const dispatch = useDispatch()

    const financialExpenses = useSelector(financialExpenseSelector.getAll)

    useEffect(() => {
        dispatch(getAllFinancialExpenses())
    }, [dispatch]);

    const { total: totalDebts, totalCompleted, totalMissing } = useCalcCategory({
        valueToCalc: financialExpenses.data
    })

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

                                    }}
                                >
                                    Add new
                                </Button>
                            </div>
                        </>
                    }
                >
                    <Table
                        headItems={headTableFinancialExpenses()}
                        bodyItems={financialExpenses.data} />
                </Box>
            </div>
        </>
    );
}