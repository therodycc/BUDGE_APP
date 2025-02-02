import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import authProvider from "../../../../providers/auth/auth.provider";
import { RccBadge, RccButton, RccForm, RccNotifications } from "rcc-react-lib";
import { inputsChangePassword } from "./inputs-verify-password";
import { RootState } from "../../../../redux-toolkit/store/index";
interface VerifyPasswordPropsI {
  setToggle: Function;
}

const VerifyPassword: FC<VerifyPasswordPropsI> = ({ setToggle }) => {
  const router = useRouter();
  const {
    changePassword: { form: dataForm },
  } = useSelector((state: RootState) => state);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    if (!error) return;
    setTimeout(() => {
      setError(null);
    }, 2000);
  }, [error]);

  const handleSubmit = async (form: any) => {
    setLoading(true);
    const result = await authProvider.changePassword({
      password: form?.password,
      newPassword: dataForm?.newPassword,
    });
    if (result.error)
      return [setError(result?.error?.message), setLoading(false)];
    setToggle(false);
    setLoading(false);
    setError(null);
    RccNotifications.alert(
      "Success",
      "Password changed successfully",
      "success"
    );
    setTimeout(() => {
      router.reload();
    }, 1000);
  };

  return (
    <React.Fragment>
      <div className="">
        <p className="text-secondary mb-0" style={{ fontSize: "16px" }}>
          Verify your Password
        </p>
        <p className="text-secondary" style={{ fontSize: "12px" }}>
          Please put you actually password for update
        </p>
      </div>
      {error && <RccBadge text={error} bgClass="danger" />}
      <RccForm
        inputsData={inputsChangePassword}
        handleSubmit={handleSubmit}
        footerSection={
          <div className="row mt-3 justify-content-between">
            <RccButton
              type="submit"
              bgClass="info"
              customClass="mb-3 col-md-6"
              action={() => {}}
              loading={loading}
            >
              Confirm
            </RccButton>
          </div>
        }
      />
    </React.Fragment>
  );
};

export default VerifyPassword;
