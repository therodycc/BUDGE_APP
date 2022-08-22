import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useContext, useMemo } from 'react';
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
  const router = useRouter();

  const showBackButton = useMemo(() => {
    return ["/wishes", "/volunteer-things", "/debt", "/necessary", "/manage", "/lending", "/fixedCosts"]
      .includes(router.pathname) ? true : false;
  }, [router])

  return (
    <React.Fragment>
      <div
        className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4"
        style={{ zIndex: 10 }}
      >

        <Link href='/manage'>
          <button className={`btn ${router.pathname === "/manage" ? "btn-info" : "btn-secondary"}`}>Manage</button>
        </Link>
        <ul className="navbar-nav ms-md-auto" >
          <div className="card px-3">
            <div className="row justify-content-center align-items-center">
              {settings?.navOptionsRenders({ router, showBackButton }).map((option, index) => (
                <React.Fragment
                  key={`nav-option-${index}`}
                >
                  {option.show &&
                    <ButtonCircleIcon
                      icon={option?.icon}
                      action={option?.action} />
                  }
                </React.Fragment>
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
