import React from "react";
import { FC, memo } from "react";
import { InputPropsI } from "../../../interfaces/common/input/input.interface";

const Input: FC<InputPropsI | any> = memo(function Input({ errorMessage, customClass, title, ...props }) {
    return (
        <React.Fragment>
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
        </React.Fragment>
    );
});

export default Input;