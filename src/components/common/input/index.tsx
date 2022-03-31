interface InputPropsI {
    errorMessage: any | string;
    title?: string
    customClass?: string
    props: React.InputHTMLAttributes<HTMLInputElement>;
}

const Input = ({ errorMessage, customClass, title, ...props }: any) => {
    return (
        <>
            <div className="row">
                {
                    title && <span className="fw-bolder text-normal">{title}</span>
                }
                <div className="input-group input-group-dynamic">

                    <input
                        className={`form-control ${customClass}`}
                        {...props}
                    />
                </div>
                {errorMessage && (
                    <span className=" text-danger text-normal fw-bolder">
                        {errorMessage}
                    </span>
                )}
            </div>
        </>
    );
};

export default Input;