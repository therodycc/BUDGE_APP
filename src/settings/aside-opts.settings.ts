import { faCommentAlt, faExplosion, faFileAlt, faHandHoldingUsd, faHandshakeAngle, faHome, faHouseFire, faListCheck, faMoneyCheckDollar, faStarHalfStroke, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { AsideOptionsI } from "../interfaces/layout/aside/aside.interface";

export const asideOptions: AsideOptionsI[] = [
    {
        icon: faHome,
        title: "Dashboard",
        active: true,
        link: "/",
    },
    {
        icon: faListCheck,
        title: "Manage",
        active: false,
        link: "/manage",
    },
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
    // {
    //     icon: faHome,
    //     title: "Savings",
    //     active: false,
    //     link: "/savings",
    // },
    {
        icon: faHome,
        title: "Necessary",
        active: false,
        link: "/necessary",
    },
    {
        icon: faFileAlt,
        title: "Reports",
        active: false,
        link: "/reports",
    },
    {
        icon: faUserAlt,
        title: "Profile",
        active: false,
        link: "/profile",
    },
    {
        icon: faMoneyCheckDollar,
        title: "Profits",
        active: false,
        link: "/profits",
    },
    {
        icon: faHandHoldingUsd,
        title: "Lending",
        active: false,
        link: "/lending",
    },
    {
        icon: faCommentAlt,
        title: "Recommendations",
        active: false,
        link: "/recommendations",
    },
]