import { faArrowsUpDown, faBell, faCog, faLanguage } from "@fortawesome/free-solid-svg-icons"

export const navOptionsRenders = (actions: { logout: Function }) => {
    return [
        {
            icon: faCog,
            action: () => { }
        },
        {
            icon: faBell,
            action: () => { }
        },
        {
            icon: faLanguage,
            action: () => { }
        },
        {
            icon: faArrowsUpDown,
            action: async () => { actions.logout() }
        },
    ]
}


export const navLayout = [
    {
        title: "Sign In",
        href: "/auth/sign-in",
        icon: "home",
        active: true,

    },
    {
        title: "Sign Up",
        href: "/auth/sign-up",
        icon: "home",
        active: false
    },
]