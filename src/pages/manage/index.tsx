import { ReactElement } from "react";
import Layout from "../../components/layout";
import Manage from "../../components/pages/manage";

const ManagePage = () => {
    return <Manage />
};

ManagePage.getLayout = (page: ReactElement) => (
    <Layout>
        {page}
    </Layout>
)


export default ManagePage;
