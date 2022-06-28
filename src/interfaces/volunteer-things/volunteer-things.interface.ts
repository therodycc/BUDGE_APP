import { ModalBaseI } from "../common/modal/modal.interface";

export interface VolunteerThingsI {
    uuid?: string
    name?: string;
    urgency?: string;
    paidOut?: number;
    expense?: number;
    status?: string;
    category?: string;
    image?: string;
    active?: boolean;
    to?: string
    inMonth?: boolean
}
export interface headItemsVolunteerThingsI {
    addToThisMonth: Function
    showModalEdit: Function
    removeItem: Function
}
export interface ModalVolunteerThingsPropsI extends ModalBaseI {
    data: VolunteerThingsI | null;
}
