import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { currencyFormat } from "../../../helpers/currency.helper";
import { getFilterByStatus } from "../../../helpers/status.helper";
import useFixedCostsStatics from "../../../hooks/useFixedCostsStatics";
import { UtilityI } from "../../../interfaces/utility/utility.interface";
import fixedCostsProvider from "../../../providers/fixed-costs/fixed-costs.provider";
import {
  addFixedCosts,
  disableFixedCost,
  removeFixedCost,
  updateFixedCost,
} from "../../../redux-toolkit/slices/fixed-costs.slice";
import { RootState } from "../../../redux-toolkit/store";
import { headItemsFixedCosts } from "../../../settings/fixed-costs/header-fixed-costs";
import { tabsSettings } from "../../../settings/manage/tabs.settings";
import { RccButton, RccBox, RccNotifications, RccTabs } from "rcc-react-lib";
import CardMini from "../../common/card/CardMini";
import { RccTable } from "rcc-react-lib";
import ModalFixedCosts from "./modals";
import { FixedCostsI } from "../../../interfaces/fixed-costs/fixed-costs.interface";

const FixedCosts = () => {
  const [dataModalUtility, setDataModalUtility] = useState<UtilityI | null>(
    null
  );
  const [tab, setTab] = useState<number>(0);

  // shows
  const [showModal, setShowModal] = useState(false);
  // loadings
  const [showLoadingAddToMoth, setShowLoadingAddToMoth] = useState(false);

  // stores
  const { fixedCosts } = useSelector((state: RootState) => state);

  const dispatch = useDispatch();

  const { total, totalActive, totalDisabled } = useFixedCostsStatics({
    fixedCosts: fixedCosts.result,
  });

  useEffect(() => {
    getAllFixedCostsData();
  }, []);

  const getAllFixedCostsData = async () => {
    const res = await fixedCostsProvider.getAll();
    dispatch(addFixedCosts({ result: res?.data }));
  };

  const addToThisMonth = (item: UtilityI) => {
    fixedCostsProvider
      .update(item?.uuid, { inMonth: !item.inMonth })
      .then((res) => {
        if (res?.error)
          return RccNotifications.toast("Error", res.error.message, "error");
        dispatch(
          updateFixedCost({
            fixedCost: { uuid: item.uuid, inMonth: !item.inMonth },
          })
        );
      })
      .catch((error) => error);
  };

  const addToMonth = () => {
    Promise.all(
      (fixedCosts?.result || [])
        ?.filter((item: FixedCostsI) => item.active)
        .map((item: FixedCostsI) =>
          fixedCostsProvider.update(item.uuid as string, {
            inMonth: true,
            paidOut: 0,
            status: "IN_PROGRESS",
          })
        )
    ).then((data: any) => {
      console.log("🪲 ~ .then ~ data", data);
      if (data?.error)
        return RccNotifications.toast("Error", data.error.message, "error");
      RccNotifications.alert(
        "Success",
        "Fixed costs added to this month",
        "success"
      );
    });
  };

  const formatFixedCosts = () => {
    Promise.all(
      (fixedCosts?.result || []).map(async (item: FixedCostsI) => {
        return await fixedCostsProvider.update(item.uuid as string, {
          status: "PENDING",
          paidOut: 0,
        });
      })
    ).then((data: any) => {
      if (data?.error)
        return RccNotifications.toast("Error", data.error.message, "error");
      RccNotifications.alert("Success", "Fixed costs was reset", "success");
    });
  };

  const changeDateToPay = async (uuid: string, day: number) => {
    const result = await fixedCostsProvider.update(uuid, { dateToPay: day });
    if (result?.error)
      return RccNotifications.toast("Error", result.error.message, "error");
  };

  const removeItem = async (item: UtilityI) => {
    const confirm = await RccNotifications.question("Are you sure?", "warning");
    if (!confirm) return;
    const res = await fixedCostsProvider.remove(item.uuid);
    if (res.error)
      return RccNotifications.alert("Error", res?.error?.message, "error");
    RccNotifications.alert("Success", "Deleted!", "success");
    dispatch(removeFixedCost({ uuid: item.uuid }));
  };

  const disabledItem = async (item: UtilityI) => {
    const res = await fixedCostsProvider.update(item?.uuid || "", {
      active: !item?.active,
    });
    if (res.error) return;
    dispatch(disableFixedCost({ item }));
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
            <CardMini amount={currencyFormat(total)} title="Fixed costs" />
          </div>
          <div className="col-sm-4">
            <CardMini
              amount={currencyFormat(totalActive)}
              title="Total active"
            />
          </div>
          <div className="col-sm-4">
            <CardMini
              amount={currencyFormat(totalDisabled)}
              title="Total disabled"
            />
          </div>
        </div>
        <RccBox
          customClassLeftSection="col-lg-8"
          customClassRightSection="col-lg-4"
          leftSection={
            <RccTabs
              tabsSettings={tabsSettings}
              setActiveTab={setTab}
              activeTab={tab}
            />
          }
          rightSection={<div></div>}
        >
          <div className="col-lg-12 my-4">
            <div className="d-flex align-center-center px-4">
              <RccButton
                action={() => {
                  setShowModal(true);
                  setDataModalUtility(null);
                }}
                bgClass={"primary"}
                type={"button"}
                loading={false}
                size="sm"
              >
                Add new
              </RccButton>
              <RccButton
                action={addToMonth}
                bgClass={"danger"}
                type={"button"}
                loading={showLoadingAddToMoth}
                size="sm"
              >
                Add to month
              </RccButton>
              <RccButton
                action={formatFixedCosts}
                bgClass={"warning"}
                type={"button"}
                loading={false}
                size="sm"
              >
                Format fixed costs
              </RccButton>
            </div>
          </div>
          <RccTable
            headItems={headItemsFixedCosts({
              addToThisMonth,
              disabledItem,
              removeItem,
              showModalEdit,
              changeDateToPay,
            })}
            bodyItems={
              fixedCosts.result?.filter((item: any) =>
                getFilterByStatus?.(tab)?.includes(item?.status)
              ) || []
            }
          />
        </RccBox>
      </div>

      {showModal && (
        <ModalFixedCosts
          active={showModal}
          data={dataModalUtility}
          setToggle={() => {
            setShowModal(false);
          }}
        />
      )}
    </>
  );
};

export default FixedCosts;
