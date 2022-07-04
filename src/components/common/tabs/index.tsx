import React, { FC, useState } from "react";
import { TabsItemI } from "../../../interfaces/common/tabs/tab.interface";
import MovingTab from "./moving-tab";
import TabItem from "./tab-item";
interface TabsPropsI {
    tabsSettings: TabsItemI[];
    setActiveTab: (tab: number) => void;
    activeTab: number;
}

const Tabs: FC<TabsPropsI> = ({ tabsSettings, setActiveTab, activeTab }) => {
    const [tabs, setTabs] = useState<TabsItemI[]>(tabsSettings);

    const handleTabClick = (index: number) => {
        setActiveTab(index)
        setTabs(_prev => _prev.map((tab, i) => {
            return {
                ...tab,
                active: i === index,
            };
        }));
    }

    return (
        <React.Fragment>
            <div className="w-100">
                <div className="nav-wrapper position-relative end-0 w-100">
                    <ul className="nav nav-pills nav-fill flex-row" style={{
                        flex: "wrap"
                    }}>
                        {tabs?.map((item, index) => (
                            <React.Fragment key={item?.title + index}>
                                <TabItem
                                    {...item}
                                    action={() => handleTabClick(index)}
                                    totalTabs={tabs?.length}
                                />
                                <MovingTab
                                    tabsCount={tabs?.length}
                                    translate={`${activeTab * 100}%`}
                                />
                            </React.Fragment>

                        ))}
                    </ul>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Tabs;
