import React, { ChangeEvent, FC } from 'react'

interface TogglePropsI {
    checked: boolean;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Toggle: FC<TogglePropsI> = ({ checked, onChange }) => {

    return (
        <div className="form-check form-switch ms-2 my-auto is-filled">
            <input
                onChange={onChange}
                className="form-check-input"
                type="checkbox"
                defaultChecked={checked}
            />
        </div>
    )

}

export default Toggle