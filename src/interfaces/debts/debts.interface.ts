export interface DebtsI {
    uuid?: string
    name: string;
    urgency?: string;
    paidOut?: number;
    expense: number;
    to?: string;
    description?: string
    status?: string;
    category: string;
    // image?: string;
    active?: boolean;
}
