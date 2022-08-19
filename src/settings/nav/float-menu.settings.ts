import { faArrowDownUpAcrossLine, faNoteSticky, faUserAlt } from "@fortawesome/free-solid-svg-icons";

export const floatOptionsSettings = (actions: { logout: Function }) => [
    {
        icon: faUserAlt,
        title: "Profile",
        active: false,
        href: "/profile",
    },
    {
        title: "Logout",
        action: () => { actions.logout() },
        icon: faArrowDownUpAcrossLine,
        active: true,
    },
]