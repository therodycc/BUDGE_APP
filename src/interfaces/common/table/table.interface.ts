import { ReactNode } from "react"

export interface TablePropsI {
    headItems: HeadItemsI[]
    bodyItems: any[] | null
}


export interface HeadItemsI {
    title?: string
    headRender?: ReactNode
    key?: string
    render?: Function
}

