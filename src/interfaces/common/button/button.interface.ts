import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { IconDefinition } from "@fortawesome/free-solid-svg-icons"
import { ReactNode } from "react"
import { bgClassType, sizeType, typeButtonType } from "./button.type"

export interface ButtonPropsI {
    children: ReactNode
    action?: Function
    bgClass: bgClassType
    size?: sizeType
    type: typeButtonType
    customClass?: string
    loading: boolean
}

export interface ButtonCircleIconPropsI {
    icon: IconProp
    action: Function
}

export interface ButtonCardPropsI {
    title: string
    icon: IconDefinition
    bgClass: bgClassType
    action: Function
}