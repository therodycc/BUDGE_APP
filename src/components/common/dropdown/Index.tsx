import React from "react";
import { DropDownPropsI } from "../../../interfaces/common/dropdown/dropdown.interface";

const Dropdown = ({ options, name, value, onChange }: DropDownPropsI) => {
    return (
        <>
            <select
                name={name}
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
