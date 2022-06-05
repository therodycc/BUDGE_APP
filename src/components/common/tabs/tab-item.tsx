import React, { FC } from "react";
import { TabItemPropsI } from "../../../interfaces/common/tabs/tab.interface";

const TabItem: FC<TabItemPropsI> = ({ action, icon, title, totalTabs }) => {
    return (
        <React.Fragment>
            <li
                className={`nav-item cursor-pointer`}
                onClick={() => action()}
                style={{ width: 100 / totalTabs + "%", }}
            >
                <a className="nav-link mb-0 px-0 py-1 ">
                    {icon} <span className="ms-1">{title}</span>
                </a>
            </li>
        </React.Fragment>
    );
};

export default TabItem;
