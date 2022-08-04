import React, { FC } from 'react'

const HeadImages: FC = () => {
    return (
        <div className="mt-n5">
            <img
                className="avatar avatar-xxl shadow-lg"
                style={{ marginRight: "-10px" }}
                alt="Image placeholder"
                src="/assets/images/avatars/man_avatar.png"
            />
            <img
                className="avatar avatar-xxl shadow-lg"
                style={{ marginLeft: "-10px" }}
                alt="Image placeholder"
                src="/assets/images/avatars/woman_avatar.png"
            />
        </div>
    )
}

export default HeadImages