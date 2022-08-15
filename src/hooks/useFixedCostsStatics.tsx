import React, { useEffect, useState } from 'react'

const useCalcCategory = ({ fixedCosts }: any) => {
    const [total, setTotal] = useState(0);
    const [totalActive, setTotalActive] = useState(0);
    const [totalDisabled, setTotalDisabled] = useState(0);

    useEffect(() => {
        setTotal(getTotalFixedCosts());
        setTotalActive(getTotalActive());
        setTotalDisabled(getTotalDisabled());
    }, [fixedCosts]);

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
    return { total, totalActive, totalDisabled }
}

export default useCalcCategory