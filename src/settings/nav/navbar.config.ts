import { faArrowsUpDown, faBell, faCog, faLanguage, IconDefinition } from '@fortawesome/free-solid-svg-icons';
interface NavOptionsI {
    icon: IconDefinition,
    active: false,
    action: Function
}

export const navOptionsRenders = (): NavOptionsI[] => {
    return [
        // {
        //     icon: faBell,
        //     active: false,
        //     action: () => { }
        // },
        // {
        //     icon: faLanguage,
        //     active: false,
        //     action: () => { }
        // },
        // {
        //     icon: faCog,
        //     active: false,
        //     action: () => { }
        // },
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