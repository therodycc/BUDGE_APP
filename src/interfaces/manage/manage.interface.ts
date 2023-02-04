import { ReactNode } from "react";
import { BgColorIconTypeCard } from "../common/card/card.type";

export interface ManageI {
    uuid?: string
    name?: string;
    urgency?: string;
    paidOut?: number;
    expense?: number;
    status?: string;
    category?: string;
    image?: string;
    active?: boolean;
    type?: any
}

export interface ManageCardsDataI {
    title: string
    description: string
    icon: ReactNode,
    amount: number,
    bgIcon: BgColorIconTypeCard
}
