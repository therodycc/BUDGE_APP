import { faArrowDownUpAcrossLine, faNoteSticky } from "@fortawesome/free-solid-svg-icons";

export const floatOptionsSettings = (actions: { logout: Function }) => [
    {
        title: "Logout",
        action: async () => { actions.logout() },
        icon: faArrowDownUpAcrossLine,
        active: true,
    },
    {
        title: "Test",
        action: async () => { },
        icon: faNoteSticky,
        active: true,
    },
]