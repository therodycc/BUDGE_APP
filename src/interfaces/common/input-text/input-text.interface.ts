import { InputTypeType } from "./input-text.type";

export interface InputTextPropsI {
    type: InputTypeType
    name: string
    placeholder: string
    onChange?: Function
    onKeyUp?: Function
    maxLength?: number
    value?: string | number
    errors?: string[]
}