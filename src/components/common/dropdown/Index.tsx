import React from "react";
import { DropDownPropsI } from "../../../interfaces/common/dropdown/dropdown.interface";

const Dropdown = ({ options, name, placeholder, value, onChange }: DropDownPropsI) => {
    return (
        <>
            <select
                name={name}
                placeholder="hello"
                className="form-select"
                style={{ borderBottom: '2px solid #d5d5d5', padding: '10px 20px' }}
                value={value}
                onChange={(e) => onChange(e)}
            >
                {
                    options.map((option, index) => (
                        <option
                            key={index + option.title}
                            value={option.value}
                        >
                            {option.title}
                        </option>
                    ))
                }
            </select>
        </>
    );
};

export default Dropdown;
