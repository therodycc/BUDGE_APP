

export interface ReportsBodyToSendI {
    description: string;
    entry:       number;
    reportItems: ReportItem[];
}

export interface ReportItem {
    name:             string;
    price:            number;
    type:             string;
    uuidItemExported: string;
}
