import { ReactElement } from "react";
import Layout from "../../components/layout";
import { Accounts } from "../../components/pages/accounts";

const AccountsPage = () => {
    return (<Accounts />);
};

AccountsPage.getLayout = (page: ReactElement) => (
    <Layout>
        {page}
    </Layout >
)


export default AccountsPage;
