import { useEffect } from 'react';
import { currencyFormat } from '../../../helpers/currency.helper';
import savingsProvider from '../../../providers/savings/savings.provider';
import CardHome from '../../common/card/CardHome';

const Savings = () => {
    useEffect(() => {
        getAllSavings()
    }, []);

    const getAllSavings = async () => {
        const result = await savingsProvider.getSavings()
        if (result.error) return
        console.log(result)
    }
    return (
        <>
            <div className="col-lg-6">
                <CardHome
                    subtitle={currencyFormat(0)}
                    title={currencyFormat(0)}
                    description={""}
                />
            </div>
        </>
    )
}

export default Savings