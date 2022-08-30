import React from 'react'

const NotWorkingSection = () => {
    return (
        <React.Fragment>
            <span
                className='px-4 py-1 bg-warning text-white rounded position-absolute'
                style={{ top: '-10px', right: '-10px' }}
            >
                Not Working
            </span>
        </React.Fragment>
    )
}

export default NotWorkingSection