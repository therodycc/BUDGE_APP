import React, { FC } from 'react'


interface UserInfoHeadPropsI {
    firstName: string
    lastName: string
    email: string
}

const UserInfoHead: FC<UserInfoHeadPropsI> = ({ firstName, lastName, email }) => {
    return (
        <>
                <div className="ml-0 col-sm-auto col-8 p-3">
                    <div className="">
                        <h6 className="mb-0 font-weight-bolder text-secondary">
                            {firstName} {lastName}
                        </h6>
                        <p className="m-0 font-weight-normal text-sm text-secondary">
                            {email}
                        </p>
                    </div>
                </div>
                <div className="col-sm-auto col-4">
                    <div className="">
                        <img
                            src="/assets/images/man-profile.png"
                            alt="bruce"
                            className="w-70 rounded-circle shadow-sm border border-light border-1 avatar avatar-lg"
                        />
                    </div>
                </div>
        </>
    )
}

export default UserInfoHead