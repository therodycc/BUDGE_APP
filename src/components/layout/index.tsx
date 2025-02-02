import { FC, useContext, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import profitsProvider from "../../providers/profits/profits.provider";
import userProvider from "../../providers/user/user.provider";
import { getMeAction } from "../../redux-toolkit/slices/me.slice";
import { addProfits } from "../../redux-toolkit/slices/profits.slice";
import { NextRouter, useRouter } from "next/router";
import { RccLayout } from "rcc-react-lib";
import authProvider from "../../providers/auth/auth.provider";
import { asideOptions } from "../../settings/aside/aside-opts.settings";
import { UIContext } from "../../context";
import React from "react";
import { RootState } from "../../redux-toolkit/store";
import { settings } from "../../settings";
import ButtonCircleIcon from "../common/button/button-circle.icon";
import UserInfoHead from "../common/user-info-head";
import Link from "next/link";

const Layout: FC<any> = ({ children }) => {
  const router: NextRouter = useRouter();
    const { handleShowAsideBar } = useContext(UIContext);
  const {
    me: { result: me },
  } = useSelector((state: RootState) => state);
  const { isMenuSquareOpen, handleIsMenuSquare } = useContext(UIContext);

  const logout = async () => {
    await authProvider.logout();
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }

    router.reload();
  };

  const dispatch = useDispatch();

  useEffect(() => {
    getMe();
  }, []);

  const getMe = async () => {
    const res = await userProvider.getMe();
    if (res.error) return console.log(res);
    dispatch(getMeAction({ me: res?.data }));
  };

  useEffect(() => {
    getAllProfits();
  }, []);

  const getAllProfits = async () => {
    const res = await profitsProvider.getAll();
    dispatch(addProfits({ result: res?.data }));
  };

  const showBackButton = useMemo(() => {
    return [
      "/wishes",
      "/volunteer-things",
      "/debt",
      "/necessary",
      "/manage",
      "/lending",
      "/fixedCosts",
    ].includes(router.pathname)
      ? true
      : false;
  }, [router]);

  return (
    <RccLayout
      asideOptions={asideOptions}
      handleShowAsideBar={handleShowAsideBar}
      leftSection={
        <Link href="/manage">
          <button
            className={`btn ${
              router.pathname === "/manage" ? "btn-info" : "btn-secondary"
            }`}
          >
            Manage
          </button>
        </Link>
      }
      rightSection={
        <div className="card px-3">
          <div className="row justify-content-center align-items-center">
            {settings
              ?.navOptionsRenders({ router, showBackButton })
              .map((option, index) => (
                <React.Fragment key={`nav-option-${index}`}>
                  {option.show && (
                    <ButtonCircleIcon
                      icon={option?.icon}
                      action={option?.action}
                    />
                  )}
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
      }
    >
      {children}
    </RccLayout>
  );
};

export default Layout;
