import { headersReports } from '../../../settings/reports/headers-reports';
import Box from '../../common/box';
import Table from '../../common/table';

const Reports = () => {
    const data = [
        {
            uuid: '12k3---23-asd-asd-2s3',
            date: "adfasdfadfasdf",
            amount: 2000,
            dateToRequest: new Date().toLocaleString()
        },
    ];

    return (
        <>
            <Box title="Reports">
                <Table headItems={headersReports()} bodyItems={data} />
            </Box>
        </>
    );
}

export default Reports