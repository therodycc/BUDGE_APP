import { ModalBaseI } from "../common/modal/modal.interface";

export interface WishesI {
    uuid?: string
    name: string;
    urgency?: string;
    paidOut?: number;
    expense: number;
    status?: string;
    category: string;
    image?: string;
    active?: boolean;
}

export interface ModalWishesPropsI extends ModalBaseI {
    data: WishesI | null;
}