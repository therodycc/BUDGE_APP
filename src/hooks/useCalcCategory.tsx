import { useCallback, useEffect, useState } from 'react';

const useCalcCategory = ({ valueToCalc }: { valueToCalc: any }) => {
    const [total, setTotal] = useState(0);
    const [totalCompleted, setTotalCompleted] = useState(0);
    const [totalMissing, setTotalMissing] = useState(0);



    const getTotalMissing = useCallback(() => {
        setTotalMissing(total - totalCompleted);
    }, [total, totalCompleted])


    const getTotal = useCallback(() => {
        setTotal(valueToCalc?.reduce((acc: number, item: any) => {
            acc += +item.expense;
            return acc;
        }, 0));
    }, [valueToCalc],)


    const getTotalCompleted = useCallback(() => {
        setTotalCompleted(valueToCalc?.reduce((acc: number, item: any) => {
            if (item.status === "COMPLETED") acc += +item.expense;
            if (item.status === "IN_PROGRESS") acc += +item.paidOut;
            return acc;
        }, 0));
    }, [valueToCalc])

    useEffect(() => {
        getTotal();
        getTotalCompleted();
    }, [getTotal, getTotalCompleted, valueToCalc]);


    useEffect(() => {
        getTotalMissing();
    }, [totalCompleted, total, getTotalMissing]);

    return { total, totalCompleted, totalMissing }
}

export default useCalcCategory