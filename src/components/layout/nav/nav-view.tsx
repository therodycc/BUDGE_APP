import { faBusSimple } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const NavView = () => {
    return (
        <>
            <nav>
                <div
                    className={`rounded-circle text-white text-center bg-info shadow me-3`}
                    style={{
                        width: '70px',
                        height: '70px',
                        lineHeight: '70px',

                    }}
                >
                    <FontAwesomeIcon icon={faBusSimple} />
                </div>
            </nav>
        </>
    )
}

export default NavView