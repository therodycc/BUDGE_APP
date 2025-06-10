import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ChangePasswordPropsI } from "../../../../interfaces/change-password/change-password.interface";
import { setFormForChangePassword } from "../../../../redux-toolkit/slices/change-password.slice";
import FormChangePassword from "./form";
import VerifyPassword from "./verify-password";
import { RccModal } from "rcc-react-lib";

const ChangePassword: FC<ChangePasswordPropsI> = ({ setToggle, active }) => {
  const [step, setStep] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setFormForChangePassword({ form: {} }));
    };
  }, [dispatch]);

  return (
    <>
      <RccModal
        title={"Change Password"}
        setToggle={setToggle}
        modalStylesContainer={{
          maxWidth: "350px",
        }}
        active={active}
      >
        {step === 1 && <FormChangePassword setStep={setStep} />}
        {step === 2 && <VerifyPassword setToggle={setToggle} />}
      </RccModal>
    </>
  );
};

export default ChangePassword;
