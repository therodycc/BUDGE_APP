import { CategoryType, StatusType, UrgencyType } from "./utilily.type";

export interface UtilityI {
    id:string
    uuid:string
    name: string,
    expense: number,
    paidOut: number,
    img: null | string
    urgency: UrgencyType,
    category: CategoryType,
    status: StatusType,
    active?:boolean
}