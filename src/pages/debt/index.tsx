import { ReactElement } from "react";
import Layout from "../../components/layout";
import Debts from "../../components/pages/debts";

const DebtPage = () => {
    return <Debts />
};
DebtPage.getLayout = (page: ReactElement) => (
    <Layout>
        {page}
    </Layout >
)

export default DebtPage;
