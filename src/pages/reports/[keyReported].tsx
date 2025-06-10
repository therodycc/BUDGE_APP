import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import React, { ReactNode } from "react";
import CardAmountText from "../../components/common/card/card-amount-text";
import ListTableCard from "../../components/common/list/list-table-card";
import Layout from "../../components/layout/base";
import { currencyFormat } from "../../helpers/currency.helper";
import reportsProvider from "../../providers/reports/reports.provider";
import { useRccFetch } from "rcc-react-lib";

export interface ReportItemI {
  uuid: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  price: string;
  paidOut: string;
}

const ReportExportedKey = () => {
  const router = useRouter();

  const { data } = useRccFetch<{}, ReportItemI[]>(
    {
      params: router.query.keyReported,
      providerAction: reportsProvider,
      functionProviderName: "getReportItems",
    },
    router.query.keyReported
  );

  return (
    <div className="col-lg-12 px-3 rounded">
      <div className="card ">
        <div className="d-flex align-items-center rounded-pill shadow-lg text-white m-3 p-3">
          <FontAwesomeIcon
            onClick={() => router.back()}
            className="bg-light rounded-circle p-3 text-dark cursor-pointer me-3"
            style={{
              fontSize: "15px",
            }}
            icon={faArrowLeft}
          />
          <h6 className="mt-2">12 - 12 - 2001</h6>
        </div>
        <div className=" p-3 py-1 ">
          <div className="row mt-2">
            <div className="col-lg-5 px-5 pt-2">
              <CardAmountText title={"Total"} description={currencyFormat(0)} />
              <CardAmountText
                title={"Pending"}
                description={currencyFormat(0)}
              />
              <CardAmountText
                title={"Remaining"}
                description={currencyFormat(0)}
              />
            </div>
            <div className="col-lg-7">
              <div className="row mx-3">
                {data?.map((item: any, index: number) => (
                  <React.Fragment key={item.name + index}>
                    <ListTableCard
                      title={item?.name}
                      description={currencyFormat(+item.price)}
                      index={index}
                    />
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ReportExportedKey.getLayout = (page: ReactNode) => <Layout>{page}</Layout>;

export default ReportExportedKey;
