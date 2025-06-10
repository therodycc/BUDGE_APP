
import { ReactElement } from "react";
import Layout from "../../components/layout/base";
import { FinancialExpenses } from "../../components/pages/financial-expenses";

const FinancialExpensesPage = () => {
    return (<FinancialExpenses />);
};

FinancialExpensesPage.getLayout = (page: ReactElement) => (
    <Layout>
        {page}
    </Layout >
)


export default FinancialExpensesPage;
