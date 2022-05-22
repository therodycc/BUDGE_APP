import { ReactElement } from "react";
import Layout from "../../components/layout";
import FixedCosts from "../../components/pages/fixed-costs";

const FixedCostsPage = () => {
    return (<FixedCosts/>);
};

FixedCostsPage.getLayout = (page: ReactElement) => (
    <Layout>
        {page}
    </Layout >
)


export default FixedCostsPage;
