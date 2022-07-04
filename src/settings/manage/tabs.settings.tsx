import { faClipboardCheck, faPersonDigging } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TabsItemI } from "../../interfaces/common/tabs/tab.interface";

export const tabsSettings: TabsItemI[] = [
    {
        title: "All",
        active: true,
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
        title: "In progress",
        active: false,
        icon: <FontAwesomeIcon icon={faPersonDigging} />,
        action: () => { }
    },
    {
        title: "Paid",
        active: false,
        icon: <FontAwesomeIcon icon={faClipboardCheck} />,
        action: () => { }
    }
]