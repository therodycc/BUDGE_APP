import { ReactNode } from "react"

export interface BoxPropsI {
    leftSection: ReactNode
    rightSection?: ReactNode
    customClassRightSection?: string
    customClassLeftSection?: string
}