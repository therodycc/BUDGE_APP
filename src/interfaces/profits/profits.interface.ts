import { ModalBaseI } from "../common/modal/modal.interface";

export interface ProfitsI {
    uuid?: string
    type?: string,
    amount?: number,
    active?: boolean
}

export interface ModalProfitsPropsI extends ModalBaseI {
    data?: any;
}