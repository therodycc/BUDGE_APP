import { useMemo } from "react";

const useManage = (manage = [], profits = [], entry = 0) => {
  const statists = useMemo(() => {
    const initialStats = {
      pending: 0,
      debt: 0,
      paidOut: 0,
      fixedCosts: 0,
      personal: 0,
      family: 0,
      voluntary: 0,
      remaining: entry,
      wishes: 0,
    };

    return manage.reduce((acc: any, item: any) => {
      const { expense, paidOut, category } = item;
      acc.pending += expense - paidOut;
      acc.paidOut += paidOut;
      acc.remaining -= expense;

      if (category in acc) {
        acc[category] += expense;
      }
      return acc;
    }, initialStats);
  }, [manage, entry]);

  return { ...statists, entry };
};

export default useManage;
