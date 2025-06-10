import { ReactElement } from "react";
import Layout from "../../components/layout/base";
import Reports from "../../components/pages/reports";

const ReportsPage = () => {
    return <Reports />
};
ReportsPage.getLayout = (page: ReactElement) => (
    <Layout>
        {page}
    </Layout >
)

export default ReportsPage;
