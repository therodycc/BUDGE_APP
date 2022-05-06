import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NextRouter, useRouter } from "next/router";
import { useSelector } from "react-redux";
import authProvider from "../../../providers/auth/auth.provider";
import { settings } from "../../../settings";
import UserInfoHead from "../../common/user-info-head";

const Nav = () => {
  const { user } = useSelector((state: any) => state.auth);
  const router: NextRouter = useRouter()

  const logout = async () => {
    const result = await authProvider.logout();
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
                <div
                  key={`nav-option-${index}`}
                  className="col-sm-auto col-4"
                >
                  <div
                    className="bg-dark rounded-circle shadow-sm border border-light text-center  cursor-pointer"
                    style={{
                      width: "50px",
                      height: "50px",
                      lineHeight: "50px",
                    }}
                    onClick={() => option.action && option.action()}
                  >
                    <FontAwesomeIcon begin="fa-solid" icon={option.icon} />
                  </div>
                </div>
              ))}

              <UserInfoHead
                firstName={user?.firstName}
                lastName={user?.lastName}
                email={user?.email}
              />
            </div>
          </div>
        </ul>
      </div >
    </>
  );
};

export default Nav;
