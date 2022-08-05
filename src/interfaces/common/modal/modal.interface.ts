import { ReactNode } from "react"

export interface ModalBaseI {
    children?: ReactNode
    active: boolean
    setToggle: Function
}
export interface ModalI extends ModalBaseI {
    title?: ReactNode
    footer?: ReactNode
    modalStylesContainer?: React.CSSProperties
}