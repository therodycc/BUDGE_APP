export interface DropDownPropsI {
    title?: string
    name?: string
    value?: string | number
    type?: string
    defaultValue?: string | number
    onChange: Function
    options: OptionsDropdownI[]
}


export interface OptionsDropdownI {
    title: string
    value: string | number
}