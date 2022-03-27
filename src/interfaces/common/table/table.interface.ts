export interface TablePropsI {
    headItems: HeadItemsI[]
    bodyItems: any[]
}


export interface HeadItemsI {
    title: string
    key?: string
    render?: Function
}

