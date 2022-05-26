import { FormEvent, ReactNode } from 'react'
import useForm from '../../../hooks/useForm'
import { InputPropsI } from '../../../interfaces/common/input/input.interface'
import Dropdown from '../dropdown'
import Input from '../input'
interface FormPropsI {
    inputsData: Function
    handleSubmit: Function
    footerSection: ReactNode
    initialState?: { [key: string]: string | number } | any
    keyForm?: string
}
const Form = ({ inputsData, handleSubmit, footerSection, keyForm,initialState }: FormPropsI) => {

    const [form, handleChange] = useForm(initialState || {})

    const handleSubmitAction = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSubmit(form)
    }

    return (
        <>
            <form onSubmit={handleSubmitAction}>
                <div className="row mt-3">
                    {inputsData({ form, errors: {} })?.map((item: InputPropsI, index: number) => (
                        <div
                            key={`${keyForm}-${index}`}
                            className={`mt-3 ${item.cols}`}>
                            {item.props.type === "dropdown" && item.options ? (
                                <Dropdown
                                    title={item.props.title}
                                    value={item.props.value?.toString()}
                                    name={item.props.name}
                                    options={item.options}
                                    onChange={handleChange}
                                />
                            ) : (
                                <Input {...item.props} {...item} onChange={handleChange} />
                            )}
                        </div>
                    ))}
                </div>
                <div className="row mt-3">
                    {footerSection}
                </div>
            </form>
        </>
    )
}

export default Form