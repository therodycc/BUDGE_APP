import { ModalBaseI } from "../common/modal/modal.interface";

export interface NecessaryI {
    uuid?: string
    name?: string;
    urgency?: string;
    paidOut?: number;
    expense: number;
    status?: string;
    category?: string;
    image?: string;
    active?: boolean;
}


export interface ModalNecessaryPropsI extends ModalBaseI {
    data?: NecessaryI | null;
}
