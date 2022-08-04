import { OptionsDropdownI } from "../dropdown/dropdown.interface";

export interface InputPropsI {
    title?: string
    customClass?: string
    cols?: string
    options?: OptionsDropdownI[]
    props: React.InputHTMLAttributes<HTMLInputElement>;
}
