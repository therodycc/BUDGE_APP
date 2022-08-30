import React, { ChangeEvent, FC } from 'react'

interface TogglePropsI extends React.InputHTMLAttributes<HTMLInputElement> {
    checked: boolean;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Toggle: FC<TogglePropsI> = ({ checked, ...props }) => {

    return (
        <div className={`form-check form-switch ms-2 my-auto is-filled ${props?.className}`}>
            <input
                className="form-check-input"
                type="checkbox"
                defaultChecked={checked}
                {...props}
            />
        </div>
    )

}

export default Toggle