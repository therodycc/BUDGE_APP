import { faCheck, faDollarSign, faMoneyCheck } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ManageCardsDataI } from "../../../../interfaces/manage/manage.interface"

export const manageCardsData = (state: any): ManageCardsDataI[] => {
    return [
        {
            title: "Entry",
            description: "",
            icon: <FontAwesomeIcon icon={faDollarSign}/>,
            amount: state?.entry,
            bgIcon: "success"
        },
        {
            title: "Pending",
            description: "",
            icon: <FontAwesomeIcon icon={faCheck} />,
            amount: state?.pending,
            bgIcon: "warning",
        },
        {
            title: "Paid Out",
            description: "",
            icon: <FontAwesomeIcon icon={faMoneyCheck}/>,
            amount: state?.paidOut,
            bgIcon: "info"
        },
        {
            title: "Fixed costs",
            description: "",
            icon: <FontAwesomeIcon icon={faCheck}/>,
            amount: state?.fixedCosts,
            bgIcon: "dark"
        },
        {
            title: "Personal",
            description: "",
            icon: <FontAwesomeIcon icon={faCheck}/>,
            amount: state?.personal,
            bgIcon: "dark"
        },
        {
            title: "Family",
            description: "",
            icon: <FontAwesomeIcon icon={faCheck}/>,
            amount: state?.family,
            bgIcon: "dark"
        },
        {
            title: "Voluntary",
            description: "",
            icon: <FontAwesomeIcon icon={faCheck}/>,
            amount: state?.voluntary,
            bgIcon: "dark"
        },
        {
            title: "Remaining",
            description: "",
            icon: <FontAwesomeIcon icon={faCheck}/>,
            amount: state?.remaining,
            bgIcon: "dark"
        },
        {
            title: "Wishes",
            description: "",
            icon: <FontAwesomeIcon icon={faCheck}/>,
            amount: state?.wishes,
            bgIcon: "dark"
        },
    ]
}