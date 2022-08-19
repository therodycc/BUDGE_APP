import useFetch from '../../../hooks/useFetch';
import reportsProvider from '../../../providers/reports/reports.provider';
import { headersReports } from '../../../settings/reports/headers-reports';
import Box from '../../common/box';
import Table from '../../common/table';

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

    return (
        <>
            <Box leftSection="Reports">
                <Table
                    headItems={headersReports()}
                    bodyItems={data as ReportsI[]}
                />
            </Box>
        </>
    );
}

export default Reports