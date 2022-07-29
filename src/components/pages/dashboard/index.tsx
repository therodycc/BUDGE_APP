import { useEffect, useState } from 'react';
import CardHome from '../../common/card/CardHome';
import { currencyFormat } from '../../../helpers/currency.helper';
import { UtilityI } from '../../../interfaces/utility/utility.interface';
import debtProvider from '../../../providers/debt/debt.provider';
import fixedCostsProvider from '../../../providers/fixed-costs/fixed-costs.provider';
import necessaryProvider from '../../../providers/necessary/necessary.provider';
import voluntaryProvider from '../../../providers/volunteer-things/volunteer-things.provider';
import wishesProvider from '../../../providers/wishes/wishes.provider';
import { useSelector, useDispatch } from 'react-redux';
import { getProfitsAction } from '../../../redux/actions/profits.action';
import CardWidget from '../../common/card/CardWidget';
import CardAmountText from '../../common/card/card-amount-text';

const Dashboard = () => {
    const [utilities, setUtilities] = useState<Array<UtilityI>>([])
    const [debt, setDebt] = useState({
        total: 0,
        totalMissing: 0
    })
    const [fixedCosts, setFixedCosts] = useState({
        active: 0,
        inactive: 0
    })
    const [wishes, setWishes] = useState({
        total: 0,
        totalMissing: 0
    })
    const [necessary, setNecessary] = useState({
        total: 0,
        totalMissing: 0
    })
    const [voluntary, setVoluntary] = useState({
        total: 0,
        totalMissing: 0
    })


    const { profits: { profits } } = useSelector((state: any) => state)
    const dispatch = useDispatch()

    useEffect(() => { dispatch(getProfitsAction()) }, []);

    useEffect(() => {
        getDebt()
        getFixedCosts()
        getWishes()
        getVoluntary()
        getNecessary()
    }, [utilities])

    const getDebt = () => {
        debtProvider.getAll()
            .then(({ data }) => {
                const totalMissing = data?.reduce((acc: number, item: any) => {
                    if (item.status === 'PENDING') acc += item.expense
                    if (item.status === 'IN_PROGRESS') acc += (item.expense - item.paidOut)
                    return acc
                }, 0);
                const total = data.reduce((acc: number, item: any) => {
                    acc += item.expense
                    return acc
                }, 0);
                setDebt({
                    total,
                    totalMissing
                })
            })
            .catch(error => error)
    }

    const getFixedCosts = () => {
        fixedCostsProvider.getAll()
            .then(({ data }) => {
                const active = data.reduce((acc: number, item: any) => {
                    if (item.active) acc += item.expense
                    return acc
                }, 0);
                const inactive = data.reduce((acc: number, item: any) => {
                    if (!item.active) acc += item.expense
                    return acc
                }, 0);

                setFixedCosts({
                    active,
                    inactive
                })
            })
            .catch(error => error)
    }

    const getWishes = () => {
        wishesProvider.getAll()
            .then(({ data }) => {
                const total = data.reduce((acc: number, item: any) => {
                    acc += item.expense
                    return acc
                }, 0);
                const totalMissing = data.reduce((acc: number, item: any) => {
                    acc += (item.expense - item.paidOut)
                    return acc
                }, 0);
                setWishes({
                    total,
                    totalMissing
                })
            })
            .catch(error => error)
    }
    const getVoluntary = () => {
        voluntaryProvider.getAll()
            .then(({ data }) => {
                const totalMissing = data.reduce((acc: number, item: any) => {
                    if (item.status === 'PENDING') acc += item.expense
                    if (item.status === 'IN_PROGRESS') acc += (item.expense - item.paidOut)
                    return acc
                }, 0);
                const total = data.reduce((acc: number, item: any) => {
                    acc += item.expense
                    return acc
                }, 0);
                setVoluntary({
                    total,
                    totalMissing
                })
            })
            .catch(error => error)
    }
    const getNecessary = () => {
        necessaryProvider.getAll()
            .then(({ data }) => {
                const totalMissing = data.reduce((acc: number, item: any) => {
                    if (item.status === 'PENDING') acc += item.expense
                    if (item.status === 'IN_PROGRESS') acc += (item.expense - item.paidOut)
                    return acc
                }, 0);
                const total = data.reduce((acc: number, item: any) => {
                    acc += item.expense
                    return acc
                }, 0);
                setNecessary({
                    total,
                    totalMissing
                })
            })
            .catch(error => error)
    }

    const getProfits = () => {
        return profits?.reduce((acc: number, item: any) => {
            if (item?.active) acc += item.amount;
            return acc;
        }, 0);
    };

    return <>
        <div className='row'>
            <div className="col-md-4">
                <CardHome
                    title={currencyFormat(debt.totalMissing)}
                    description='Debts'
                    subtitle={currencyFormat(debt.total)}
                />
                <CardHome
                    title={currencyFormat(fixedCosts.active)}
                    description='Fixed costs'
                    subtitle={`Inactive - ${currencyFormat(fixedCosts.inactive)}`}
                />
                <CardHome
                    title={currencyFormat(necessary.totalMissing)}
                    description='Necessary'
                    subtitle={`${currencyFormat(necessary.total)}`}
                />
            </div>
            <div className="col-md-4">
                <CardHome
                    title={currencyFormat(wishes.totalMissing)}
                    description='Wishes'
                    subtitle={currencyFormat(wishes.total)}
                />
                <CardHome
                    title={currencyFormat(voluntary.totalMissing)}
                    description='Voluntary'
                    subtitle={currencyFormat(voluntary.total)}
                />
            </div>
            <div className="col-md-4">
                <CardAmountText title={"Church Tithe - 10%"} description={(currencyFormat(getProfits() * 0.10)).toString()} />
                <CardAmountText title={"Debts and Savings - 20%"} description={(currencyFormat(getProfits() * 0.20)).toString()} />
                <CardAmountText title={"Wishes and more - 20%"} description={(currencyFormat(getProfits() * 0.20)).toString()} />
                <CardAmountText title={"Fixed Costs - 50%"} description={(currencyFormat(getProfits() * 0.50)).toString()} />
            </div>
        </div>
    </>;
};

export default Dashboard;
