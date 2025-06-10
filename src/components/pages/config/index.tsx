import { faPaintbrush } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import ButtonCard from "../../common/button/button-card";
import ChangePassword from "../profile/change-password";

const ConfigPage = () => {
  const [showChangePassword, setShowChangePassword] = useState(false);
  return (
    <div className="h-100 mt-5">
      <div className="card card-body bg-light mx-3 mx-md-4">
        <div className="row my-3">
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
              action={() => {}}
              title={"Edit my profile"}
              icon={faPaintbrush}
              bgClass={"danger"}
            />
          </div>
        </div>
      </div>
      {showChangePassword && (
        <ChangePassword
          setToggle={setShowChangePassword}
          active={showChangePassword}
        />
      )}
    </div>
  );
};

export default ConfigPage;
