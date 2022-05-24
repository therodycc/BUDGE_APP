import { ChangeEvent, FC, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { isRequired } from "../../../../helpers/validations/index";
import useForm from "../../../../hooks/useForm";
import { setFormData } from "../../../../redux/actions/auth/change-password";
import { changePasswordInputs } from "../../../../settings/profile/change-password-inputs.settings";
import Button from "../../../common/button";
import Form from "../../../common/form";

interface FormChangePasswordPropsI { }
const FormChangePassword: FC<FormChangePasswordPropsI> = () => {
    const [form, handleChange] = useForm()
    const dispatch = useDispatch();
    const [newPasswordError, setNewPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

    const handleSubmit = async () => {
        const errNewPassword = isRequired(
            form.newPassword,
            "New password is required",
            setNewPasswordError
        );
        const errConfirmPassword = isRequired(
            form.newPassword === form.confirmPassword,
            "Password do not match",
            setConfirmPasswordError
        );
        if (errNewPassword || errConfirmPassword) return;
        dispatch(setFormData({ form }));
    };
    return (
        <>
            <Form
                inputsData={changePasswordInputs(form, {
                    newPasswordError,
                    confirmPasswordError,
                })}
                handleSubmit={handleSubmit}
                handleChange={handleChange}
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
