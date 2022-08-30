import React from 'react'

interface RadioButtonProps extends React.InputHTMLAttributes<HTMLInputElement> {
    type?: "YOU CAN'T PUT THE TYPE"
    label: string
}

const RadioButton = ({ label, ...props }: RadioButtonProps) => {
    return (
        <React.Fragment>
            <div className="form-check">
                <input
                    type="radio"
                    className={`form-check-input ${props?.className || ""}`}
                    {...props}
                />
                <label className="custom-control-label" htmlFor={props?.id}>{label}</label>
            </div>
        </React.Fragment>
    )
}

export default RadioButton