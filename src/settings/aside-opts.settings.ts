import { faHome } from "@fortawesome/free-solid-svg-icons";
import { AsideOptionsI } from "../interfaces/layout/aside/aside.interface";

export const asideOptions: AsideOptionsI[] = [
    {
        icon: faHome,
        title: "Dashboard",
        active: true,
        link: "/",
    },
    {
        icon: faHome,
        title: "Manage",
        active: false,
        link: "/manage",
    },
    {
        icon: faHome,
        title: "Fixed costs",
        active: false,
        link: "/fixedCosts",
    },
    {
        icon: faHome,
        title: "Wishes",
        active: false,
        link: "/wishes",
    },
    {
        icon: faHome,
        title: "Volunteer things",
        active: false,
        link: "/volunteer-things",
    },
    {
        icon: faHome,
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
        icon: faHome,
        title: "Reports",
        active: false,
        link: "/reports",
    },
    {
        icon: faHome,
        title: "Profile",
        active: false,
        link: "/profile",
    },
    {
        icon: faHome,
        title: "Profits",
        active: false,
        link: "/profits",
    },
    {
        icon: faHome,
        title: "Lending",
        active: false,
        link: "/lending",
    },
    {
        icon: faHome,
        title: "Recommendations",
        active: false,
        link: "/recommendations",
    },
]