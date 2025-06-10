import { NextRouter, useRouter } from "next/router";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import authProvider from "../../../providers/auth/auth.provider";
import profitsProvider from "../../../providers/profits/profits.provider";
import userProvider from "../../../providers/user/user.provider";
import { getMeAction } from "../../../redux-toolkit/slices/me.slice";
import { addProfits } from "../../../redux-toolkit/slices/profits.slice";
import { asideOptions } from "../../../settings/aside/aside-opts.settings";

import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { usePathname } from "next/navigation";

import { RccButton, RccLayout } from "rcc-react-lib";
import React from "react";
import { RootState } from "../../../redux-toolkit/store";
import { settings } from "../../../settings";
import ButtonCircleIcon from "../../common/button/button-circle.icon";

export interface AsideOptionsI {
  icon: IconDefinition;
  title: string;
  active: boolean;
  link: string;
}

const Layout: FC<any> = ({ children }) => {
  const router: NextRouter = useRouter();
  const pathname = usePathname();
  const [options, setOptions] = useState<AsideOptionsI[]>([]);
  // const { handleShowAsideBar } = useContext(UIContext);
  const {
    me: { result: me },
  } = useSelector((state: RootState) => state);
  // const { isMenuSquareOpen, handleIsMenuSquare } = useContext(UIContext);

  const dispatch = useDispatch();

  const getMe = useCallback(async () => {
    const res = await userProvider.getMe();
    if (res.error) return console.log(res);
    dispatch(getMeAction({ me: res?.data }));
  }, [dispatch]);

  const getAllProfits = useCallback(async () => {
    const res = await profitsProvider.getAll();
    dispatch(addProfits({ result: res?.data }));
  }, [dispatch]);

  useEffect(() => {
    getMe();
  }, [getMe]);

  useEffect(() => {
    getAllProfits();
  }, [getAllProfits]);

  const logout = useCallback(async () => {
    await authProvider.logout();
    document.cookie.split(";").forEach((cookie) => {
      document.cookie = `${
        cookie.split("=")[0]
      }=;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    });
    router.reload();
  }, [router]);

  const showBackButton = useMemo(() => {
    return [
      "/wishes",
      "/volunteer-things",
      "/debt",
      "/necessary",
      "/manage",
      "/lending",
      "/fixedCosts",
    ].includes(router.pathname);
  }, [router.pathname]);

  const navigateToManagePage = () => {
    router.push("/manage");
  };

  useEffect(() => {
    handleSelected(pathname);
  }, [pathname]);

  const handleSelected = useCallback(
    (path: string) => {
      setOptions(
        asideOptions.map((opt) => ({
          ...opt,
          active: path === opt.link,
        }))
      );
      path && router.push(path);
    },
    [asideOptions, setOptions]
  );

  return (
    <RccLayout
      asideOptions={options}
      logout={logout}
      handleSelected={handleSelected}
      handleShowAsideBar={() => {}}
      navContent={
        <div className="w-100 d-flex align-items-center justify-content-between">
          <RccButton
            bgClass={router.pathname === "/manage" ? "info" : "secondary"}
            type={"button"}
            loading={false}
            action={navigateToManagePage}
          >
            Manage
          </RccButton>

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
            {/* <UserInfoHead
              imageAction={handleIsMenuSquare}
              firstName={me?.firstName}
              lastName={me?.lastName}
              email={me?.email}
            /> */}
          </div>
        </div>
      }
    >
      {children}
    </RccLayout>
  );
};

export default Layout;
