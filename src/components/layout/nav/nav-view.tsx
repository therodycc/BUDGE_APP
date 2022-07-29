import { faBarsStaggered, faBusSimple } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext } from 'react'
import { UIContext } from '../../../context';

const NavView = () => {
    const { handleShowAsideBar } = useContext(UIContext);
    return (
        <>
            <nav>
                <div
                    className={`rounded-circle text-white text-center bg-info shadow-lg cursor-pointer me-3`}
                    style={{ width: '70px', height: '70px', lineHeight: '70px', }}
                    onClick={handleShowAsideBar}
                >
                    <FontAwesomeIcon icon={faBarsStaggered} />
                </div>
            </nav>
        </>
    )
}

export default NavView