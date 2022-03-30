import React from 'react'
import { InputTextPropsI } from '../../../interfaces/common/input-text/input-text.interface'

const InputText = ({ type, onChange, name, placeholder, onKeyUp, maxLength, value, errors }: InputTextPropsI) => {
    return (
        <>
            <div className="row">
                <div className="input-group input-group-dynamic">
                    <input
                        name={name}
                        className=" form-control"
                        type={type}
                        onChange={(e) => onChange && onChange(e)}
                        placeholder={placeholder}
                        onKeyDown={(e) => { onKeyUp && onKeyUp(e) }}
                        maxLength={maxLength && maxLength}
                        value={value}
                    />
                </div>
                <span className="text-danger mt-1" style={{ fontSize: '12px' }}>
                    {(errors && errors.length > 0) && errors[0]}
                </span>
            </div>
        </>
    )
}

export default InputText
