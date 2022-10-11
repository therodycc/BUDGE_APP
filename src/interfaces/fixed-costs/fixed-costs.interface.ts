import { ModalBaseI } from "../common/modal/modal.interface";

export interface FixedCostsI {
    uuid?: string
    name?: string;
    urgency?: string;
    paidOut?: number;
    expense?: number;
    status?: string;
    category?: string;
    image?: string;
    active?: boolean;
    inMonth?: boolean;
}

export interface headItemsFixedCostsI {
    addToThisMonth: Function
    showModalEdit: Function
    removeItem: Function
    disabledItem: Function
    changeDateToPay: Function

}
export interface ModalFixedCostsPropsI extends ModalBaseI {
    data?: any;
}