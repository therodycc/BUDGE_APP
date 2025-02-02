import Script from "next/script";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currencyFormat } from "../../../helpers/currency.helper";
import { createTablePdf } from "../../../helpers/pdf/create-table-pdf";
import { getFilterByStatus } from "../../../helpers/status.helper";
import useManage from "../../../hooks/useManage";
import { ManageCardsDataI } from "../../../interfaces/manage/manage.interface";
import { UtilityI } from "../../../interfaces/utility/utility.interface";
import reportsProvider from "../../../providers/reports/reports.provider";
import manageProvider from "../../../providers/utilities/utilities.provider";
import {
    addManage,
    removeAllManage,
    removeManage,
} from "../../../redux-toolkit/slices/manage/manage.slice";

import { RccBox, RccButton, RccTable, RccTabs } from "rcc-react-lib";
import { tabsSettings } from "../../../settings/manage/tabs.settings";
import Card from "../../common/card";
import CardAmountText from "../../common/card/card-amount-text";

import {
    manageCardsData,
    manageCategories,
} from "./cards-settings/manage-card";
import { ColumnsManageItems } from "./headers/manage-headers";
import ModalManage from "./modals";

const Manage = () => {
  // store
  const { profits, manage } = useSelector((state: any) => state);
  const dispatch = useDispatch();
  const [tab, setTab] = useState<number>(0);

  const {
    debt,
    entry,
    family,
    fixedCosts,
    paidOut,
    pending,
    personal,
    remaining,
    voluntary,
    wishes,
  } = useManage(
    manage.result,
    profits.result,
    profits?.result?.reduce((acc: number, item: any) => {
      if (item?.active) acc += item.amount;
      return acc;
    }, 0)
  );
  const [showModal, setShowModal] = useState(false);
  const [dataModalUtility, setDataModalUtility] = useState<UtilityI | null>(
    null
  );

  const removeItem = async (item: UtilityI) => {
    if (!confirm) return;
    const res = await manageProvider.updateAction(item.uuid, item.type.name, {
      inMonth: false,
    });
    dispatch(removeManage({ uuid: item?.uuid }));
  };

  const getAllManage = useCallback(async () => {
    const res = await manageProvider.getAll();
    let added: any = [];

    res.data.forEach((item: any) => {
      item.forEach((element: any) => {
        added.push(element);
      });
    });

    dispatch(addManage({ result: added }));
  }, [dispatch]);

  useEffect(() => {
    getAllManage();
  }, [getAllManage]);

  const showModalEdit = (item: UtilityI) => {
    setDataModalUtility(item);
    setShowModal(!showModal);
  };

  const resetTableData = useCallback(async () => {
    if (!confirm) return;
    Promise.all(
      manage?.result?.map((item: any) =>
        manageProvider.updateAction(item.uuid, item.type.name, {
          inMonth: false,
        })
      ) || []
    ).then((res: any) => {
      dispatch(removeAllManage());
    });
  }, [dispatch, manage?.result]);

  const handleExportData = useCallback(async () => {
    if (!confirm) return;
    const result = await reportsProvider.createReports({
      description: "THERE IS NOT A DESCRIPTION",
      entry,
      reportItems:
        manage?.result?.map((item: any) => ({
          name: item.name,
          price: item.expense,
          type: item.type.name,
          uuidItemExported: item.uuid,
        })) || [],
    });
    createTablePdf(manage?.result, entry, pending, remaining);
  }, [entry, manage?.result, pending, remaining]);

  return (
    <>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></Script>
      <div className="container">
        <div className="row mt-5">
          <div className="col-lg-8 row">
            {manageCardsData({ entry, paidOut, remaining, pending }).map(
              (item: ManageCardsDataI, index: number) => (
                <Card
                  key={`manage-card-${index}`}
                  title={item?.title}
                  description={item?.description}
                  icon={item?.icon}
                  amount={currencyFormat(item?.amount)}
                  bgIcon={item?.bgIcon}
                />
              )
            )}
          </div>
          <div className="col-lg-4">
            {manageCategories({
              debt,
              fixedCosts,
              personal,
              family,
              voluntary,
              wishes,
            }).map((item: ManageCardsDataI, index: number) => (
              <CardAmountText
                key={`manage-card-${index}`}
                title={item?.title}
                description={currencyFormat(item.amount)}
              />
            ))}
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
            <React.Fragment>
              <RccButton
                bgClass={"danger"}
                type={"button"}
                loading={false}
                action={handleExportData}
              >
                Export
              </RccButton>
              <RccButton
                action={resetTableData}
                bgClass={"info"}
                type={"button"}
                loading={false}
              >
                Reset
              </RccButton>
            </React.Fragment>
          }
        >
          <div id="test">
            <ColumnsManageItems
              removeItem={removeItem}
              showModalEdit={showModalEdit}
            >
              {({ columns }) => (
                <RccTable
                  headItems={columns}
                  bodyItems={
                    manage?.result?.filter((item: any) =>
                      getFilterByStatus?.(tab)?.includes(item?.status)
                    ) || []
                  }
                />
              )}
            </ColumnsManageItems>
          </div>
        </RccBox>
      </div>
      {dataModalUtility && showModal && (
        <ModalManage
          active={false}
          toggle={() => setShowModal(false)}
          data={{
            type: dataModalUtility?.type?.name,
            expense: dataModalUtility?.expense,
            paidOut: dataModalUtility?.paidOut,
            uuid: dataModalUtility?.uuid,
          }}
        />
      )}
    </>
  );
};

export default Manage;
