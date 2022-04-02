export interface VolunteerThingsI {
    uuid?:string
    name?: string;
    urgency?: string;
    paidOut?: number;
    expense?: number;
    status?: string;
    category?: string;
    image?: string;
    active?: boolean;
    to?:string
}
