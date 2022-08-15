import React from "react";
import { DropDownPropsI } from "../../../interfaces/common/dropdown/dropdown.interface";

const Dropdown = ({ options, name, value, onChange, title ,defaultValue}: DropDownPropsI) => {
    return (
        <>
            <div className="row px-2">
                {
                    title && <span className="fw-bolder text-normal p-1">{title}</span>
                }

                <select
                    name={name}
                    className="form-select"
                    style={{ borderBottom: '2px solid #d5d5d5', padding: '10px 20px' }}
                    value={value}
                    defaultValue={defaultValue}
                    onChange={(e) => onChange(e)}
                >
                    {
                        options.map((option, index) => (
                            <option
                                key={`${option.value}-${index}`}
                                value={option.value}
                            >
                                {option.title}
                            </option>
                        ))
                    }
                </select>
            </div>
        </>
    );
};

export default Dropdown;
