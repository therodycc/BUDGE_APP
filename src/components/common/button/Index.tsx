import React from 'react';
import { ButtonPropsI } from '../../../interfaces/common/button/button.interface';

const Button = ({ children, action, bgClass, size, type, loading, customClass }: ButtonPropsI) => {
    return (
        <>
            <button
                onClick={() => action?.()}
                type={type}
                className={`btn btn-${bgClass} btn-${size && (size || '')} mx-1 ${customClass}`}
                disabled={loading}
            >
                {
                    loading ?
                        <div className='d-flex align-items-center justify-content-center text-white'>
                            <span className="spinner-border spinner-border-sm mx-1" ></span>
                            <span className="">Please wait...</span>
                        </div>
                        : children

                }
            </button>
        </>
    )
}

export default Button
