import React, { useEffect, useState } from "react";
import { currencyFormat } from "../../../helpers/currency.helper";
import useCalcCategory from "../../../hooks/useCalcCategory";
import { UtilityI } from "../../../interfaces/utility/utility.interface";
import { headersLeading } from "../../../settings/leading/headers-leading";
import CardMini from "../../common/card/CardMini";
import { RccBox, RccTable } from "rcc-react-lib";

const Leading = () => {
  const [leading, setLeading] = useState<Array<any> | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [dataModalUtility, setDataModalUtility] = useState<UtilityI | null>(
    null
  );

  const {
    total: totalLeading,
    totalCompleted,
    totalMissing,
  } = useCalcCategory({
    valueToCalc: leading,
  });

  useEffect(() => {
    getLeading();
  }, []);

  const getLeading = () => {
    // leadingProvider.getAll()
    //     .then(res => {
    //         setLeading(res?.data);
    //     })
    //     .catch(error => error)
  };

  const removeItem = async (item: UtilityI) => {
    if (!confirm) return;
    // leadingProvider.remove(item.id)
    //     .then(data => {
    //         getLeading()
    //     })
    //     .catch(error => error)
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
            <CardMini amount={currencyFormat(totalLeading)} title="Leading" />
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
        <RccBox leftSection="Leading">
          <RccTable
            headItems={headersLeading({ removeItem, showModalEdit })}
            bodyItems={leading}
          />
        </RccBox>
      </div>
    </>
  );
};

export default Leading;
