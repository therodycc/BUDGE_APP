import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currencyFormat } from "../../../helpers/currency.helper";
import { getFilterByStatus } from "../../../helpers/status.helper";
import useCalcCategory from "../../../hooks/useCalcCategory";

import { NecessaryI } from "../../../interfaces/necessary/necessary.interface";
import { UtilityI } from "../../../interfaces/utility/utility.interface";
import necessaryProvider from "../../../providers/necessary/necessary.provider";
import {
  addNecessaries,
  removeNecessary,
  updateNecessary,
} from "../../../redux-toolkit/slices/necessary.slice";
import { tabsSettings } from "../../../settings/manage/tabs.settings";
import { headersModalNecessary } from "../../../settings/necessary/headers-necessary";
import { RccButton, RccBox, RccNotifications, RccTabs } from "rcc-react-lib";
import CardMini from "../../common/card/CardMini";
import { RccTable } from "rcc-react-lib";
import ModalNecessary from "./modals";
import { RootState } from "../../../redux-toolkit/store/index";

const Necessary = () => {
  const dispatch = useDispatch();
  const { necessary } = useSelector((state: RootState) => state);

  const [showModal, setShowModal] = useState(false);
  const [dataModalUtility, setDataModalUtility] = useState<NecessaryI | null>(
    null
  );
  const [tab, setTab] = useState(0);

  const getAllNecessaryData = useCallback(async () => {
    const res = await necessaryProvider.getAll();
    dispatch(addNecessaries({ result: res?.data }));
  }, [dispatch]);

  useEffect(() => {
    getAllNecessaryData();
  }, [getAllNecessaryData]);

  const {
    totalCompleted,
    totalMissing,
    total: totalNecessary,
  } = useCalcCategory({
    valueToCalc: necessary.result,
  });

  const addToThisMonth = (item: UtilityI) => {
    necessaryProvider
      .update(item.uuid, { inMonth: true })
      .then((res) => {
        if (res.error)
          return RccNotifications.toast("Error", res.error.message, "error");
        dispatch(
          updateNecessary({ necessary: { uuid: item.uuid, inMonth: true } })
        );
      })
      .catch((error) => error);
  };

  const removeItem = async (item: NecessaryI) => {
    const confirm = await RccNotifications.question("Are you sure?", "warning");
    if (!confirm) return;
    const res = await necessaryProvider.remove(item.uuid as string);
    if (res.error)
      return RccNotifications.alert("Error", res?.error?.message, "error");
    RccNotifications.alert("Success", "Done!", "success");
    dispatch(removeNecessary({ uuid: item.uuid as string }));
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
            <CardMini
              amount={currencyFormat(totalNecessary)}
              title="Necessary"
            />
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
        <RccBox
          leftSection={
            <RccTabs
              tabsSettings={tabsSettings}
              setActiveTab={setTab}
              activeTab={tab}
            />
          }
          rightSection={
            <>
              <div className="">
                <RccButton
                  bgClass={"success"}
                  type={"button"}
                  loading={false}
                  action={() => {
                    setShowModal(true);
                    setDataModalUtility(null);
                  }}
                >
                  Add new
                </RccButton>
              </div>
            </>
          }
        >
          <RccTable
            headItems={headersModalNecessary({
              addToThisMonth,
              removeItem,
              showModalEdit,
            })}
            bodyItems={(necessary.result || [])?.filter((item: any) =>
              getFilterByStatus?.(tab)?.includes(item?.status)
            )}
          />
        </RccBox>
      </div>

      {showModal && (
        <ModalNecessary
          active={showModal}
          setToggle={() => {
            setShowModal(false);
          }}
          data={dataModalUtility}
        />
      )}
    </>
  );
};

export default Necessary;
