export interface DropDownPropsI {
    title?: string
    name?: string
    value?: string 
    type?: string
    onChange: Function
    options: OptionsDropdownI[]
}


export interface OptionsDropdownI {
    title: string
    value: string
}