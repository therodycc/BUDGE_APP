import React, { FC } from 'react'

const HeadImages: FC = () => {
    return (
        <div className="mt-n5">
            <img
                className="avatar avatar-xxl shadow-lg"
                style={{ marginRight: "-10px" }}
                alt="Image placeholder"
                src="https://www.w3schools.com/howto/img_avatar.png"
            />
            <img
                className="avatar avatar-xxl shadow-lg"
                style={{ marginLeft: "-10px" }}
                alt="Image placeholder"
                src="https://www.w3schools.com/howto/img_avatar2.png"
            />
        </div>
    )
}

export default HeadImages