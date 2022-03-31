import { ReactNode } from "react"
import { bgClassType, sizeType, typeButtonType } from "./button.type"

export interface ButtonPropsI {
    children: ReactNode
    action?: Function
    bgClass: bgClassType
    size?:sizeType
    type:typeButtonType
    customClass?:string
    loading:boolean
}

