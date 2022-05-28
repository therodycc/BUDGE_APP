import { NextRouter, useRouter } from "next/router";
import { useSelector } from "react-redux";
import authProvider from "../../../providers/auth/auth.provider";
import { settings } from "../../../settings";
import ButtonCircleIcon from "../../common/button/button-circle.icon";
import UserInfoHead from "../../common/user-info-head";

const Nav = () => {
  const { user: { me } } = useSelector((state: any) => state);
  const router: NextRouter = useRouter()

  const logout = async () => {
    await authProvider.logout();
    router.push("/auth/sign-in");
  }

  return (
    <>
      <div
        className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4"
      >
        <ul className="navbar-nav ms-md-auto">
          <div className="card px-3">
            <div className="row justify-content-center align-items-center">
              {settings.navOptionsRenders({ logout }).map((option, index) => (
                <ButtonCircleIcon
                  key={`nav-option-${index}`}
                  icon={option.icon}
                  action={option?.action} />
              ))}

              <UserInfoHead
                firstName={me?.firstName}
                lastName={me?.lastName}
                email={me?.email}
              />
            </div>
          </div>
        </ul>
      </div >
    </>
  );
};

export default Nav;
