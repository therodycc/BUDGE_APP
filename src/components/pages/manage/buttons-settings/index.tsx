import { faSpinner, faTrashAlt } from "@fortawesome/free-solid-svg-icons"
import { ButtonGroupI } from "../../../common/button/button-group"
interface ButtonGroupDataManageI {
    action1: Function,
    action2: Function,
}
export const ButtonGroupDataManage = ({ action1, action2 }: ButtonGroupDataManageI): ButtonGroupI[] => [
    {
        bgClass: 'secondary',
        icon: faSpinner,
        action: () => { action1?.() }
    },
    {
        bgClass: 'light',
        icon: faTrashAlt,
        action: () => { action2?.() }
    }
]