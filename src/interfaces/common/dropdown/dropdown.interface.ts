export interface DropDownPropsI {
    name: string
    value: string
    onChange: Function
    options: OptionsDropdownI[]
}


export interface OptionsDropdownI {
    title: string
    value: string
}