import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currencyFormat } from "../../../helpers/currency.helper";
import { getFilterByStatus } from "../../../helpers/status.helper";
import useCalcCategory from "../../../hooks/useCalcCategory";
import { UtilityI } from "../../../interfaces/utility/utility.interface";
import { VolunteerThingsI } from "../../../interfaces/volunteer-things/volunteer-things.interface";
import volunteerThingsProvider from "../../../providers/volunteer-things/volunteer-things.provider";
import {
    addVolunteerThings,
    removeVolunteerThing,
    updateVolunteerThing,
} from "../../../redux-toolkit/slices/volunteer-things.slice";
import { tabsSettings } from "../../../settings/manage/tabs.settings";
import { headersVolunteerThings } from "../../../settings/volunteer-things/headers-table.settings";

import {
    RccBox,
    RccButton,
    RccNotifications,
    RccTable,
    RccTabs,
} from "rcc-react-lib";
import { RootState } from "../../../redux-toolkit/store/index";
import CardMini from "../../common/card/CardMini";
import ModalVolunteerThings from "./modals";

const VolunteerThings = () => {
  const { volunteerThings } = useSelector((state: RootState) => state);

  const [showModal, setShowModal] = useState(false);
  const [dataModalUtility, setDataModalUtility] = useState<UtilityI | null>(
    null
  );

  const [tab, setTab] = useState<number>(0);

  const dispatch = useDispatch();

  const {
    total: totalVolunteerThings,
    totalCompleted,
    totalMissing,
  } = useCalcCategory({
    valueToCalc: volunteerThings.result,
  });

  const getAllVolunteerThings = useCallback(async () => {
    const res = await volunteerThingsProvider.getAll();
    dispatch(addVolunteerThings({ result: res?.data }));
  }, [dispatch]);

  useEffect(() => {
    getAllVolunteerThings();
  }, [getAllVolunteerThings]);

  const addToThisMonth = useCallback(
    (item: VolunteerThingsI) => {
      volunteerThingsProvider
        .update(item.uuid || "", { inMonth: true })
        .then((res) => {
          if (res?.error)
            return RccNotifications.toast("Error", res.error.message, "error");
          dispatch(
            updateVolunteerThing({
              volunteerThing: { uuid: item.uuid, inMonth: true },
            })
          );
        })
        .catch((error) => error);
    },
    [dispatch]
  );
  
  const removeItem = async (item: VolunteerThingsI) => {
    const confirm = await RccNotifications.question("Are you sure?", "warning");
    if (!confirm) return;
    const res = await volunteerThingsProvider.remove(item.uuid as string);
    if (res.error)
      return RccNotifications.alert("Error", res?.error?.message, "error");
    RccNotifications.alert("Success", "Done!", "success");
    dispatch(removeVolunteerThing({ uuid: item.uuid as string }));
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
              amount={currencyFormat(totalVolunteerThings)}
              title="Total Volunteer Things"
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
          customClassLeftSection="col-lg-8"
          customClassRightSection="col-lg-4"
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
            headItems={headersVolunteerThings({
              addToThisMonth,
              removeItem,
              showModalEdit,
            })}
            bodyItems={
              volunteerThings?.result?.filter((item: any) =>
                getFilterByStatus?.(tab)?.includes(item?.status)
              ) || []
            }
          />
        </RccBox>
      </div>

      {showModal && (
        <ModalVolunteerThings
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

export default VolunteerThings;
