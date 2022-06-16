import { TabsItemI } from "../../interfaces/common/tabs/tab.interface"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPersonDigging, faPray } from "@fortawesome/free-solid-svg-icons";

export const tabsSettings: TabsItemI[] = [
    {
        title: "All",
        active: false,
        icon: <FontAwesomeIcon icon={faPersonDigging} />,
        action: () => { }
    },
    {
        title: "Pending",
        active: false,
        icon: <FontAwesomeIcon icon={faPersonDigging} />,
        action: () => { }
    },
    {
        title: "Paid",
        active: true,
        icon: <FontAwesomeIcon icon={faPray} />,
        action: () => { }
    }
]