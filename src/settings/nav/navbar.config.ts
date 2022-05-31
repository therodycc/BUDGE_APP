import { faArrowsUpDown, faBell, faCog, faLanguage } from "@fortawesome/free-solid-svg-icons"

export const navOptionsRenders = (actions?: { handleIsMenuSquare: Function }) => {
    return [
        {
            icon: faBell,
            active: false,
            action: () => { }
        },
        {
            icon: faLanguage,
            active: false,
            action: () => { }
        },
        // {
        //     icon: faArrowsUpDown,
        //     active: false,
        //     action: async () => { }
        // },
        {
            icon: faCog,
            active: false,
            action: () => { actions?.handleIsMenuSquare() }
        },
    ]
}


export const navAuth = [
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