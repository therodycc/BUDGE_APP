import React, { FC } from 'react'
export interface MovingTabPropsI {
    tabsCount: number
    translate: string
}
const MovingTab: FC<MovingTabPropsI> = ({ tabsCount, translate }) => {
    return (
        <React.Fragment>
            <div
                className="moving-tab position-absolute nav-link"
                style={{
                    padding: "0px",
                    transition: "all 1s ease 0s",
                    transform: `translate3d(${translate}, 0px, 0px)`,
                    width: 100 / tabsCount + "%",
                }}
            >
                <a className={`nav-link mb-0 px-0 py-1 active `} >
                    <div style={{ visibility: "hidden" }}>-</div>
                </a>
            </div>
        </React.Fragment>
    )
}

export default MovingTab   