import { FC, memo } from "react";

interface InputPropsI {
    errorMessage: any | string;
    title?: string
    customClass?: string
    props: React.InputHTMLAttributes<HTMLInputElement>;
}

const Input: FC<InputPropsI | any> = memo(({ errorMessage, customClass, title, ...props }) => {
    return (
        <>
            <div className="row text-left">
                {
                    title && <span className="fw-bolder text-normal">{title}</span>
                }
                <div className="input-group input-group-dynamic">

                    <input
                        className={`form-control ${customClass || ""}`}
                        {...props}
                    />
                </div>
                {errorMessage && (
                    <div className="col-lg-12">
                        <span className="text-danger text-normal ">
                            {errorMessage}
                        </span>
                    </div>
                )}
            </div>
        </>
    );
});

export default Input;