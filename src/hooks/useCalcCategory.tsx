import { useEffect, useState } from 'react';

const useCalcCategory = ({ valueToCalc }: { valueToCalc: any }) => {
    const [total, setTotal] = useState(0);
    const [totalCompleted, setTotalCompleted] = useState(0);
    const [totalMissing, setTotalMissing] = useState(0);

    useEffect(() => {
        getTotal();
        getTotalCompleted();
    }, [valueToCalc]);

    useEffect(() => {
        getTotalMissing();
    }, [totalCompleted, total]);

    const getTotalMissing = () => {
        setTotalMissing(total - totalCompleted);
    };

    const getTotal = () => {
        setTotal(valueToCalc?.reduce((acc: number, item: any) => {
            acc += +item.expense;
            return acc;
        }, 0));
    };

    const getTotalCompleted = () => {
        setTotalCompleted(valueToCalc?.reduce((acc: number, item: any) => {
            if (item.status === "COMPLETED") acc += item.expense;
            if (item.status === "IN_PROGRESS") acc += item.paidOut;
            return acc;
        }, 0));
    };

    return { total, totalCompleted, totalMissing }
}

export default useCalcCategory