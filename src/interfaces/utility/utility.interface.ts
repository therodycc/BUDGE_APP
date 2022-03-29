import { CategoryType, StatusType, UrgencyType } from "./utilily.type";

export interface UtilityI {
    id:string
    uuid:string
    necessary: string,
    expense: number,
    paidOut: number,
    img: null
    urgency: UrgencyType,
    category: CategoryType,
    status: StatusType,
    active?:boolean
}