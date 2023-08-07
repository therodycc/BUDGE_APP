import { CategoryType, StatusType, UrgencyType } from "./utilily.type";

export interface UtilityI {
    id: string
    uuid: string
    name: string,
    expense: number,
    paidOut: number,
    img: null | string
    //TODO:RODY PENDING TO REMOVE ANY 
    type: any
    inMonth?: boolean
    urgency: UrgencyType,
    category: CategoryType,
    status: StatusType,
    active?: boolean
}