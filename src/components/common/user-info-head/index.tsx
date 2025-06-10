import React, { FC } from 'react'

interface UserInfoHeadPropsI {
    firstName: string
    lastName: string
    email: string
    imageAction: Function
}

const UserInfoHead: FC<UserInfoHeadPropsI> = ({ firstName, lastName, email, imageAction }) => {
    return (
        <>
            <div className="ml-0 col-sm-auto col-8 text-end" >
                <div className="">
                    <p className="my-0 pb-0 font-weight-bolder text-secondary">
                        {firstName} {lastName}
                    </p>
                    <p className="my-0 font-weight-normal text-sm text-secondary">
                        {email}
                    </p>
                </div>
            </div>
            <div className="col-sm-auto col-4">
                <div className="" onClick={() => imageAction()}>
                    <img
                        src="/assets/images/man-profile.png"
                        alt="bruce"
                        className="w-40 rounded-circle shadow-sm border border-light border-1 avatar avatar-sm user-profile-head-image"
                    />
                </div>
            </div>
        </>
    )
}

export default UserInfoHead