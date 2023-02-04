export interface TabsItemI {
    title: string;
    active: boolean;
    icon: React.ReactNode
    action?: Function
}

export interface TabItemPropsI extends TabsItemI {
    totalTabs: number
}