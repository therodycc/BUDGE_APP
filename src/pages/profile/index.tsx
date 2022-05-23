import { ReactElement } from "react";
import Layout from "../../components/layout";
import Profile from "../../components/pages/profile";

const ProfilePage = () => {
    return <Profile />
};

ProfilePage.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default ProfilePage;
