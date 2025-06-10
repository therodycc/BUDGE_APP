import { useMemo } from "react";

const useCalcCategory = ({ fixedCosts }: any) => {
  const total = useMemo(() => {
    return fixedCosts?.reduce((acc: any, item: any) => {
      acc += item.expense;
      return acc;
    }, 0);
  }, [fixedCosts]);

  const totalActive = useMemo(() => {
    return fixedCosts?.reduce((acc: any, item: any) => {
      if (item.active) acc += item.expense;
      return acc;
    }, 0);
  }, [fixedCosts]);

  const totalDisabled = useMemo(() => {
    return fixedCosts?.reduce((acc: any, item: any) => {
      if (!item.active) acc += item.expense;
      return acc;
    }, 0);
  }, [fixedCosts]);

  return { total, totalActive, totalDisabled };
};

export default useCalcCategory;
