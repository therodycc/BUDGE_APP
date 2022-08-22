import { faExplosion, faHandshakeAngle, faHome, faPaintbrush, faStarHalfStroke, faHandHoldingUsd, faHouseFire } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link'
import React, { ReactNode } from 'react'
import ButtonCard from '../../components/common/button/button-card'
import Layout from '../../components/layout'

const General = () => {
    return (
        <React.Fragment>
            <div className="row  my-3 ">
                {optionsPages.map((option, index) => (
                    <Link href={option.link}>
                        <div className="col-sm-6">
                            <ButtonCard
                                title={option.title}
                                action={() => { }}
                                icon={option.icon}
                                bgClass={"info"}
                            />
                        </div>
                    </Link>
                ))}
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