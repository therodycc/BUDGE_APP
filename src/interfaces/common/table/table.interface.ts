export interface TablePropsI {
    headItems: HeadItemsI[]
    bodyItems: any[] | null
}


export interface HeadItemsI {
    title: string
    key?: string
    render?: Function
}

