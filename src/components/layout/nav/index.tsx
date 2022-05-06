import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NextRouter, useRouter } from "next/router";
import { useSelector } from "react-redux";
import authProvider from "../../../providers/auth/auth.provider";
import { settings } from "../../../settings";

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

              <div className="ml-0 col-sm-auto col-8">
                <div className="">
                  <h6 className="mb-0 font-weight-bolder text-secondary">
                    {user?.firstName} {user?.lastName}
                  </h6>
                  <p className="m-0 font-weight-normal text-sm text-secondary">
                    {user?.email}
                  </p>
                </div>
              </div>
              <div className="col-sm-auto col-4">
                <div className="avatar avatar-xl position-relative">
                  <img
                    src="/assets/images/man-profile.png"
                    alt="bruce"
                    className="w-70 rounded-circle shadow-sm border border-light"
                  />
                </div>
              </div>
            </div>
          </div>
        </ul>
      </div >
    </>
  );
};

export default Nav;
