import { CategoryType, StatusType, UrgencyType } from "../../utility/utilily.type"
import { UtilityI } from "../../utility/utility.interface"

export interface FormBudgetI {
    data:UtilityI 
    setToggle: Function
    refreshData:Function
    urlTo:string
}