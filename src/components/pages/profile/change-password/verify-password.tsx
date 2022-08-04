import { ChangeEvent, FC, useState } from 'react';
import { useSelector } from 'react-redux';
import useForm from '../../../../hooks/useForm';
import authProvider from '../../../../providers/auth/auth.provider';
import Button from '../../../common/button';
import Input from '../../../common/input/index';
interface VerifyPasswordPropsI {
}
const VerifyPassword: FC<VerifyPasswordPropsI> = ({ }) => {
    const [passwordError, setPasswordError] = useState("");

    const { changePassword: { form: formState } } = useSelector((state: any) => state)

    const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        // const result = await authProvider.changePassword({
        //     password: form.password,
        //     newPassword: formState?.newPassword
        // })

        // if (result.error) return setPasswordError(result.error.message);
    }
    return (
        <>
            <form className="p-3" onSubmit={handleSubmit}>
                <div className="row mt-3">
                    <Input
                        // onChange={handleChange}
                        name={`password`}
                        placeholder={``}
                        type={`password`}
                        // value={form?.password}
                        title={"Password"}
                        errorMessage={passwordError}
                    />
                </div>

                <Button
                    type="submit"
                    bgClass="info"
                    customClass='w-100 mt-3'
                    action={() => { }}
                    loading={false}
                >
                    Confirm
                </Button>
            </form>
        </>
    )
}

export default VerifyPassword