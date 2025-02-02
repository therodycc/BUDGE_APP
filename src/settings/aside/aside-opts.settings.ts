import {
  faCableCar,
  faCommentAlt,
  faFileAlt,
  faHome,
  faHouseFire,
  faPiggyBank,
} from "@fortawesome/free-solid-svg-icons";

export const asideOptions: any[] = [
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
  {
    icon: faCableCar,
    title: "Financial expenses",
    active: false,
    link: "/financial-expenses",
  },
];
