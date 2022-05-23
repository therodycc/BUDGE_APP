import { ReactElement } from "react";
import Layout from "../../components/layout";
import VolunteerThings from "../../components/pages/volunteer-things";

const VolunteerThingsPage = () => {
    return <VolunteerThings />
};
VolunteerThingsPage.getLayout = (page: ReactElement) => (
    <Layout>
        {page}
    </Layout >
)

export default VolunteerThingsPage;
