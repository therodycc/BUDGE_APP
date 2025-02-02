import { FC } from "react";
import { useDispatch } from "react-redux";
import { setFormForChangePassword } from "../../../../redux-toolkit/slices/change-password.slice";
import {
  changePasswordInputs,
  changePasswordRules,
} from "../../../../settings/profile/change-password-inputs.settings";
import { RccButton, RccForm } from "rcc-react-lib";

interface FormChangePasswordPropsI {
  setStep: (step: number) => void;
}
const FormChangePassword: FC<FormChangePasswordPropsI> = ({ setStep }) => {
  const dispatch = useDispatch();

  const handleSubmit = (form: any) => {
    dispatch(setFormForChangePassword({ form }));
    setStep(2);
  };

  return (
    <>
      <RccForm
        keyForm="changePassword"
        dataRules={changePasswordRules}
        inputsData={changePasswordInputs}
        handleSubmit={handleSubmit}
        footerSection={
          <>
            <RccButton
              type="submit"
              bgClass="info"
              customClass="w-100"
              action={() => {}}
              loading={false}
            >
              Send
            </RccButton>
          </>
        }
      />
    </>
  );
};

export default FormChangePassword;
