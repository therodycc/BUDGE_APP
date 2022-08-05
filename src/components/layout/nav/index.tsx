import React from "react";
import { useContext } from "react";
import { useSelector } from "react-redux";
import { UIContext } from "../../../context";
import { settings } from "../../../settings";
import BackModal from "../../common/back-modals/back-modal";
import ButtonCircleIcon from "../../common/button/button-circle.icon";
import UserInfoHead from "../../common/user-info-head";
import FloatMenu from "./float-menus";

const Nav = () => {
  const { user: { me } } = useSelector((state: any) => state);
  const { isMenuSquareOpen, handleIsMenuSquare } = useContext(UIContext);

  return (
    <React.Fragment>
      <div
        className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4"
        style={{ zIndex: 10 }}
      >
        <ul className="navbar-nav ms-md-auto" >
          <div className="card px-3">
            <div className="row justify-content-center align-items-center">
              {settings?.navOptionsRenders().map((option, index) => (
                <ButtonCircleIcon
                  key={`nav-option-${index}`}
                  icon={option?.icon}
                  action={option?.action} />
              ))}
              <UserInfoHead
                imageAction={handleIsMenuSquare}
                firstName={me?.firstName}
                lastName={me?.lastName}
                email={me?.email}
              />
            </div>
          </div>
        </ul>
      </div >
      {
        isMenuSquareOpen &&
        <BackModal
          toggle={() => handleIsMenuSquare()}
        >
          < FloatMenu />
        </BackModal>
      }
    </React.Fragment>
  );
};

export default Nav;
