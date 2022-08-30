import { faArrowDownUpAcrossLine, faNoteSticky, faUserAlt, faGear } from '@fortawesome/free-solid-svg-icons';

export const floatOptionsSettings = (actions: { logout: Function }) => [
    {
        icon: faUserAlt,
        title: "Profile",
        active: false,
        href: "/profile",
    },
    {
        icon: faGear,
        title: "Config",
        active: false,
        href: "/config",
    },
    {
        title: "Logout",
        action: () => { actions.logout() },
        icon: faArrowDownUpAcrossLine,
        active: true,
    },
]