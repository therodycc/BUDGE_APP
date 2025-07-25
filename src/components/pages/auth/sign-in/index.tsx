import router from "next/router";
import { RccButton, RccForm, RccNotifications } from "rcc-react-lib";
import { useState } from "react";
import authProvider from "../../../../providers/auth/auth.provider";
import inputsAuthRenderSettings, {
  inputsAuthRenderRules,
} from "../../../../settings/auth/inputs-auth-render.settings";
import HeadImages from "../../../common/head-images";

const SignIn = () => {
  const [loadingAuth, setLoadingAuth] = useState<boolean>(false);

  const handleSubmit = async (form: any) => {
    setLoadingAuth(true);
    const res = await authProvider.signIn(form);
    if (res?.error)
      return [
        RccNotifications.toast("Error", res?.error?.message, "error"),
        setLoadingAuth(false),
      ];
    router.push("/");
    setLoadingAuth(false);
  };

  return (
    <>
      <div className="col-lg-12 m-auto">
        <div className="col-lg-4 mx-auto">
          <div className="card mx-3" style={{ zIndex: 1 }}>
            <div className="card-header text-center py-0">
              <HeadImages />
            </div>
            <div className="card-body ">
              <p className="mb-4 text-center">
                Enter password to unlock your account.
              </p>

              <RccForm
                dataRules={inputsAuthRenderRules}
                keyForm="sign-in"
                inputsData={inputsAuthRenderSettings}
                handleSubmit={handleSubmit}
                footerSection={
                  <>
                    <RccButton
                      bgClass={"primary"}
                      type={"submit"}
                      loading={loadingAuth}
                      customClass="mt-3 w-100"
                    >
                      Log In
                    </RccButton>
                  </>
                }
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
