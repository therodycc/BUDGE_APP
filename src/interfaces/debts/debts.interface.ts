import { ModalBaseI } from "../common/modal/modal.interface";

export interface DebtsI {
    uuid?: string
    name?: string;
    urgency?: string;
    paidOut?: number;
    expense?: number;
    to?: string;
    description?: string
    status?: string;
    category?: string;
    // image?: string;
    inMonth?: boolean
    active?: boolean;
}


export interface headItemsDebtsI {
    addToThisMonth: Function
    showModalEdit: Function
    removeItem: Function
}


export interface ModalDebtsPropsI extends ModalBaseI {
    data?: DebtsI | null;
}
