import { ReactElement } from "react";
import Layout from "../../components/layout/base";
import Necessary from "../../components/pages/necessary";

const NecessaryPage = () => {
    return <Necessary />
};

NecessaryPage.getLayout = (page: ReactElement) => (
    <Layout>
        {page}
    </Layout >
)

export default NecessaryPage;
