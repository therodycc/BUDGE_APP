import React from 'react'

const NavView = () => {
    return (
        <>
            <nav>
                <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
                    <li className="breadcrumb-item text-sm">
                        <a className="opacity-5 text-dark">Pages</a>
                    </li>
                    <li
                        className="breadcrumb-item text-sm text-dark active"
                        aria-current="page"
                    >
                        Dashboard
                    </li>
                </ol>
                <h6 className="font-weight-bolder mb-0">Dashboard</h6>
            </nav>
        </>
    )
}

export default NavView