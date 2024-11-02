import sweetAlert from '../../../helpers/alerts/sweetAlert.helper';
import useFetch from '../../../hooks/useFetch';
import reportsProvider from '../../../providers/reports/reports.provider';
import { headersReports } from '../../../settings/reports/headers-reports';
import Box from '../../common/box';
import { RccTable } from 'rcc-react-lib'

export interface ReportsI {
    uuid: string;
    createAt: string;
    updatedAt: string;
    entry: string;
    description: string;
}


const Reports = () => {

    const { data } = useFetch({
        providerAction: reportsProvider,
        functionProviderName: 'getReports',
    });

    const deleteReport = async (uuid: string) => {
        const result = await reportsProvider.deleteReport(uuid);
        if (result.error) return sweetAlert.toast("Error", result?.error?.message, 'error');
        sweetAlert.toast("Success", "Report deleted", 'success');
    }

    return (
        <>
            <Box leftSection="Reports">
                <RccTable
                    headItems={headersReports({ deleteReport })}
                    bodyItems={data as ReportsI[]}
                />
            </Box>
        </>
    );
}

export default Reports