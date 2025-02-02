import reportsProvider from "../../../providers/reports/reports.provider";
import { headersReports } from "../../../settings/reports/headers-reports";
import { RccBox, RccNotifications, RccTable, useRccFetch } from "rcc-react-lib";

export interface ReportsI {
  uuid: string;
  createAt: string;
  updatedAt: string;
  entry: string;
  description: string;
}

const Reports = () => {
  const { data } = useRccFetch({
    providerAction: reportsProvider,
    functionProviderName: "getReports",
  });

  const deleteReport = async (uuid: string) => {
    const result = await reportsProvider.deleteReport(uuid);
    if (result.error)
      return RccNotifications.toast("Error", result?.error?.message, "error");
    RccNotifications.toast("Success", "Report deleted", "success");
  };

  return (
    <>
      <RccBox leftSection="Reports">
        <RccTable
          headItems={headersReports({ deleteReport })}
          bodyItems={data as ReportsI[]}
        />
      </RccBox>
    </>
  );
};

export default Reports;
