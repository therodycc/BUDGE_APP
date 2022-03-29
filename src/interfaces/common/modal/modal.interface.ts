import { ReactNode } from "react"

export interface ModalI{
    active?:boolean
    title?:ReactNode
    children:ReactNode
    footer?:ReactNode
    setToggle:Function
}