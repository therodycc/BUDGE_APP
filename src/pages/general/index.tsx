import { faExplosion, faHandHoldingUsd, faHandshakeAngle, faHome, faHouseFire, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactNode, useState } from 'react';
import Layout from '../../components/layout';
import Debts from '../../components/pages/debts';
import Necessary from '../../components/pages/necessary';
import VolunteerThings from '../../components/pages/volunteer-things';
import FixedCosts from '../fixedCosts';
import LendingPage from '../lending';
import Wishes from '../wishes';
import { RccTabs } from "rcc-react-lib";

const General = () => {
    const [tab, setTab] = useState(0);

    return (
        <React.Fragment>
            <div className="row  my-3 ">
                <div className="mb-5">
                    <RccTabs
                        tabsSettings={optionsPages.map(item => ({
                            ...item,
                            icon: <FontAwesomeIcon icon={item.icon} />
                        }))
                        }
                        setActiveTab={setTab}
                        activeTab={tab}
                    />
                </div>

                {tab === 0 && <FixedCosts />}
                {tab === 1 && <Wishes />}
                {tab === 2 && <VolunteerThings />}
                {tab === 3 && <Debts />}
                {tab === 4 && <Necessary />}
                {tab === 5 && <LendingPage />}
            </div>
        </React.Fragment>
    )
}


const optionsPages = [
    {
        icon: faHouseFire,
        title: "Fixed costs",
        active: false,
        link: "/fixedCosts",
    },
    {
        icon: faStarHalfStroke,
        title: "Wishes",
        active: false,
        link: "/wishes",
    },
    {
        icon: faHandshakeAngle,
        title: "Volunteer things",
        active: false,
        link: "/volunteer-things",
    },
    {
        icon: faExplosion,
        title: "Debt",
        active: false,
        link: "/debt",
    },
    {
        icon: faHome,
        title: "Necessary",
        active: false,
        link: "/necessary",
    },
    {
        icon: faHandHoldingUsd,
        title: "Lending",
        active: false,
        link: "/lending",
    },
]

General.getLayout = (page: ReactNode) => <Layout>{page}</Layout>

export default General