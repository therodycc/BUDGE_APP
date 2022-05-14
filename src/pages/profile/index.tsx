import { faPaintbrush } from "@fortawesome/free-solid-svg-icons";
import { ReactElement, useState } from "react";
import ButtonCard from "../../components/common/button/button-card";
import Layout from "../../components/layout";
import BgLayoutPage from "../../components/layout/bg-layout-page";
import FormChangePassword from "../../components/pages/profile/change-password/form";
import VerifyPassword from "../../components/pages/profile/change-password/verify-password";

const Profile = () => {

    const [modalPassword, setModalPassword] = useState(false);

    return (
        <>
            <BgLayoutPage>
                <div className="card card-body bg-light mx-3 mx-md-4 mt-n12">
                    <div className="row  my-3 ">
                        <div className="col-sm-6">
                            <ButtonCard title={"Change Password"} icon={faPaintbrush} bgClass={"info"} />
                            <ButtonCard title={"Change Password"} icon={faPaintbrush} bgClass={"info"} />
                        </div>
                        <div className=" col-sm-6">
                            <ButtonCard title={"Edit my profile"} icon={faPaintbrush} bgClass={"danger"} />
                            {/* <FormChangePassword /> */}
                        </div>
                    </div>
                </div>
            </BgLayoutPage>
            <VerifyPassword
                show={modalPassword}
                setToggle={setModalPassword} />
        </>
    );
};
Profile.getLayout = (page: ReactElement) => (
    <Layout>
        {page}
    </Layout >
)


export default Profile;
