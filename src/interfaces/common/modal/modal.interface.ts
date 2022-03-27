import { ReactNode } from "react"

export interface ModalI{
    head:ReactNode
    children:ReactNode
    footer:ReactNode
    setToggle:Function
}