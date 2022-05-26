import { FC } from "react";
import { useDispatch } from "react-redux";
import { setFormData } from "../../../../redux/actions/auth/change-password";
import { changePasswordInputs } from "../../../../settings/profile/change-password-inputs.settings";
import Button from "../../../common/button";
import Form from "../../../common/form";

interface FormChangePasswordPropsI { }
const FormChangePassword: FC<FormChangePasswordPropsI> = () => {
    const dispatch = useDispatch();

    const handleSubmit = (form: any) => {
        dispatch(setFormData({ form }));
    };
    return (
        <>
            <Form
                keyForm="changePassword"
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
