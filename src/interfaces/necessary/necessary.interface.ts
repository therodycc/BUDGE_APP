import { ModalBaseI } from "../common/modal/modal.interface";

export interface NecessaryI {
    uuid?: string
    name?: string;
    urgency?: string;
    paidOut?: number;
    expense?: number;
    status?: string;
    category?: string;
    image?: string;
    active?: boolean;
    inMonth?: boolean
}

export interface headItemsNecessaryI {
    addToThisMonth: Function
    showModalEdit: Function
    removeItem: Function
}


export interface ModalNecessaryPropsI extends ModalBaseI {
    data?: NecessaryI | null;
}
