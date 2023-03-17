import { faCableCar, faCommentAlt, faExplosion, faFileAlt, faHandHoldingUsd, faHandshakeAngle, faHome, faHouseFire, faListCheck, faMoneyCheckDollar, faPiggyBank, faStarHalfStroke, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { AsideOptionsI } from "../../interfaces/layout/aside/aside.interface";

export const asideOptions: AsideOptionsI[] = [
    {
        icon: faHome,
        title: "Dashboard",
        active: true,
        link: "/",
    },
    {
        icon: faHouseFire,
        title: "General",
        active: false,
        link: "/general",
    },
    {
        icon: faPiggyBank,
        title: "Savings",
        active: false,
        link: "/savings",
    },
    {
        icon: faFileAlt,
        title: "Reports",
        active: false,
        link: "/reports",
    },
    {
        icon: faCommentAlt,
        title: "Recommendations",
        active: false,
        link: "/recommendations",
    },
    {
        icon: faCableCar,
        title: "Accounts",
        active: false,
        link: "/accounts",
    },
]