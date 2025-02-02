import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currencyFormat } from "../../../helpers/currency.helper";
import { getFilterByStatus } from "../../../helpers/status.helper";
import { gxUUID } from "../../../helpers/uuid-generator.helper";
import useCalcCategory from "../../../hooks/useCalcCategory";
import { StatusType } from "../../../interfaces/utility/utilily.type";
import { WishesI } from "../../../interfaces/wishes/wishes.interface";
import wishesProvider from "../../../providers/wishes/wishes.provider";
import {
  addWishes,
  removeWish,
  updateWish,
} from "../../../redux-toolkit/slices/wishes.slice";
import { RootState } from "../../../redux-toolkit/store";
import { tabsSettings } from "../../../settings/manage/tabs.settings";
import { RccButton, RccNotifications, RccTabs } from "rcc-react-lib";
import CardImg from "../../common/card/CardImg";
import CardMini from "../../common/card/CardMini";
import TrafficLights from "../../common/traffic-lights";
import CustomBtnGroups from "../../custom/btn-actions-groups";
import ModalWishes from "./modals";

const Wishes = () => {
  const { wishes } = useSelector((state: RootState) => state);
  const [showModal, setShowModal] = useState(false);
  const [dataModalUtility, setDataModalUtility] = useState<WishesI | null>(
    null
  );
  const [tab, setTab] = useState<number>(0);
  const dispatch = useDispatch();

  const {
    total: totalWishes,
    totalCompleted,
    totalMissing,
  } = useCalcCategory({
    valueToCalc: wishes.result,
  });

  useEffect(() => {
    getAllWishes();
  }, []);

  const getAllWishes = async () => {
    const res = await wishesProvider.getAll();
    dispatch(addWishes({ result: res?.data }));
  };

  const addToThisMonth = (item: WishesI) => {
    wishesProvider
      .update(item?.uuid || "", { inMonth: true })
      .then((res) => {
        if (res.error)
          return RccNotifications.toast("Error", res.error.message, "error");
        dispatch(updateWish({ wishes: { uuid: item.uuid, inMonth: true } }));
      })
      .catch((error) => error);
  };

  const removeItem = async (item: WishesI) => {
    const confirm = await RccNotifications.question("Are you sure?", "warning");
    if (!confirm) return;
    const res = await wishesProvider.remove(item.uuid as string);
    if (res.error)
      return RccNotifications.alert("Error", res?.error?.message, "error");
    RccNotifications.alert("Success", "Done!", "success");
    dispatch(removeWish({ uuid: item.uuid as string }));
  };

  const showModalEdit = (item: WishesI) => {
    setDataModalUtility(item);
    setShowModal(!showModal);
  };

  return (
    <>
      <div className="row">
        <div className="col-sm-4">
          <CardMini amount={currencyFormat(totalWishes)} title="Wishes" />
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

      <div className="row justify-content-between align-items-center mt-5 bg-white mx-2 p-2 border-radius-lg shadow">
        <div className="col-lg-8">
          <RccTabs
            tabsSettings={tabsSettings}
            setActiveTab={setTab}
            activeTab={tab}
          />
        </div>
        <div className="col-lg-4 row mt-3">
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
      </div>

      <div className="flex-wrap mb-5 d-flex justify-content-between">
        {(wishes?.result || [])
          ?.filter((item: any) =>
            getFilterByStatus?.(tab)?.includes(item?.status)
          )
          ?.map((item: any, i: number) => (
            <div className="col-xl-4 col-sm-6 mb-xl-0" key={gxUUID()}>
              <CardImg
                title={item.name}
                description={item.expense.toString()}
                image={item.image || ""}
                completed={item.status === "COMPLETED" ? true : false}
                inMonth={item?.inMonth}
              >
                <div className="mx-4">
                  <div className="row">
                    <div className="col-md-4">
                      <TrafficLights status={item.status as StatusType} />
                    </div>
                    <div className="col-md-8 d-flex p-0 justify-content-end">
                      <CustomBtnGroups
                        action1={() => addToThisMonth(item)}
                        action2={() => showModalEdit(item)}
                        action3={() => removeItem(item)}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-4">
                      <button className="btn btn-info btn-sm">Link</button>
                    </div>
                  </div>
                </div>
              </CardImg>
            </div>
          ))}
      </div>
      {showModal && (
        <ModalWishes
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

export default Wishes;
