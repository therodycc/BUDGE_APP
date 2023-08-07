import { ReactNode } from "react";
import { ProfitI } from "../../app/profit/profit.interface";
import { BgColorIconTypeCard } from "./card.type";
interface CardBaseI {
    title: string
    description: string
}
export interface CardPropsI extends CardBaseI {
    amount?: string
    icon?: ReactNode
    bgIcon?: BgColorIconTypeCard
}

export interface CardMiniPropsI {
    title: string
    amount: string;
}
export interface CardImgPropsI extends CardBaseI {
    image: string
    completed: boolean
    inMonth: boolean
    children: ReactNode
}
export interface CardWidgetI extends CardBaseI {
    toggleEnabled: Function
    item?: ProfitI
    handleDelete: Function
    handleUpdate: Function
}
export interface CardHomePropsI extends CardBaseI {
    subtitle: string
}