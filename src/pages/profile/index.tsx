import { ReactElement } from "react";
import { useSelector } from "react-redux";
import Layout from "../../components/layout";
import FormChangePassword from "../../components/pages/profile/change-password/form";
import ProfitsList from "../../components/pages/profits/list";

const Profile = () => {

    const { user: { me } } = useSelector((state: any) => state)

    return (
        <>
            <div className="container-fluid px-2 px-md-4">
                <div
                    className="page-header min-height-300 border-radius-xl mt-4"
                    style={{ backgroundImage: "url(/assets/images/bg-profile.jfif)", }}
                >
                    <span className="mask  bg-gradient-info  opacity-4"></span>
                </div>
                <div className="card card-body mx-3 mx-md-4 mt-n12">
                    <div className="row  my-3">
                        <div className="col-sm-6">
                            <ProfitsList />
                        </div>
                        <div className="card card-body col-sm-6">
                            <FormChangePassword />
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};
Profile.getLayout = (page: ReactElement) => (
    <Layout>
        {page}
    </Layout >
)


export default Profile;
