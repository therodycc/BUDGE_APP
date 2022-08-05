import { FC } from "react";
import { useDispatch } from "react-redux";
import { setFormData } from "../../../../redux/actions/auth/change-password";
import { changePasswordInputs, changePasswordRules } from "../../../../settings/profile/change-password-inputs.settings";
import Button from "../../../common/button";
import Form from "../../../common/form";

interface FormChangePasswordPropsI {
    setStep: (step: number) => void;
}
const FormChangePassword: FC<FormChangePasswordPropsI> = ({ setStep }) => {
    const dispatch = useDispatch();

    const handleSubmit = (form: any) => {
        dispatch(setFormData({ form }));
        setStep(2);
    };

    return (
        <>
            <Form
                keyForm="changePassword"
                dataRules={changePasswordRules}
                inputsData={changePasswordInputs}
                handleSubmit={handleSubmit}
                footerSection={<>
                    <Button
                        type="submit"
                        bgClass="info"
                        customClass="w-100"
                        action={() => { }}
                        loading={false}
                    >
                        Send
                    </Button>
                </>}
            />

        </>
    );
};

export default FormChangePassword;
