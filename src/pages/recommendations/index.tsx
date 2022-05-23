import { ReactElement } from "react";
import Layout from "../../components/layout";
import Recommendations from "../../components/pages/recommendations";

const RecommendationsPage = () => {
    return <Recommendations />
};
RecommendationsPage.getLayout = (page: ReactElement) => (
    <Layout>
        {page}
    </Layout >
)

export default RecommendationsPage;
