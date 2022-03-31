export interface FixedCostsI {
    name: string;
    urgency?: string;
    paidOut?: number;
    expense:  number | string;
    status?: string;
    category: string;
    image?: string;
    active?: boolean;
}
