import React, { FC } from 'react'
import { BoxPropsI } from '../../../interfaces/common/box/box.interface'

const Box: FC<BoxPropsI> = ({ children, leftSection, rightSection, customClassLeftSection, customClassRightSection }) => {
    return (
        <>
            <div className="col-md-12">
                <div className="card mb-4">
                    <div className="card-header pb-0 ">
                        <div className="row">
                            <div className={`${customClassLeftSection || "col-lg-6"} d-flex justify-content-start align-items-center`}>
                                {leftSection}
                            </div>
                            <div className={`${customClassRightSection || "col-lg-6"} d-flex justify-content-end `}>
                                {rightSection}
                            </div>
                        </div>
                    </div>
                    <div className="card-body px-0 pt-0 pb-2">
                        <div className="table-responsive p-0">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Box
