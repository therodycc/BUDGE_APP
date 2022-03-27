import React from 'react'
import { InputTextPropsI } from '../../../interfaces/common/input-text/input-text.interface'

const InputText = ({ type, onChange, name, placeholder, onKeyUp, maxLength, value }: InputTextPropsI) => {
    return (
        <>
            <div className="input-group input-group-dynamic">
                <input
                    name={name}
                    className="multisteps-form__input form-control"
                    type={type}
                    onChange={(e) => onChange && onChange(e)}
                    placeholder={placeholder}
                    onKeyDown={(e) => { onKeyUp && onKeyUp(e) }}
                    maxLength={maxLength && maxLength}
                    value={value}
                />
            </div>
        </>
    )
}

export default InputText
