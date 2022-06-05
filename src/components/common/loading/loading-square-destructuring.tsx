import React, { FC } from 'react'
interface LoadingSquareDestructuringPropsI {
    customClassLoading?: string
}
const LoadingSquareDestructuring: FC<LoadingSquareDestructuringPropsI> = ({ customClassLoading }) => {
    return (
        <>
            <div className="position-absolute w-100 h-100 d-flex align-items-center justify-content-center bg-white overflow-hidden" style={{ zIndex: 10 }}>
                <div className="sk-cube-grid-destructuring" >
                    {
                        [...Array(9)].map((_, index) => (
                            <div key={index} className={`sk-cube sk-cube${index + 1} ${customClassLoading}`} />
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default LoadingSquareDestructuring