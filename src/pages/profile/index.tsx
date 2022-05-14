import { faPaintbrush } from "@fortawesome/free-solid-svg-icons";
import { ReactElement, useState } from "react";
import ButtonCard from "../../components/common/button/button-card";
import Layout from "../../components/layout";
import BgLayoutPage from "../../components/layout/bg-layout-page";
import ChangePassword from "../../components/pages/profile/change-password";

const Profile = () => {
    const [showChangePassword, setShowChangePassword] = useState(false);

    return (
        <>
            <BgLayoutPage>
                <div className="card card-body bg-light mx-3 mx-md-4 mt-n12">
                    <div className="row  my-3 ">
                        <div className="col-sm-6">
                            <ButtonCard
                                title={"Change Password"}
                                action={() => setShowChangePassword(true)}
                                icon={faPaintbrush}
                                bgClass={"info"}
                            />
                        </div>
                        <div className=" col-sm-6">
                            <ButtonCard
                                action={() => { }}
                                title={"Edit my profile"}
                                icon={faPaintbrush}
                                bgClass={"danger"}
                            />
                        </div>
                    </div>
                </div>
            </BgLayoutPage>
            {showChangePassword && (
                <ChangePassword toggle={setShowChangePassword} />
            )}
        </>
    );
};

Profile.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default Profile;
