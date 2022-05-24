import { useState } from 'react';
interface UseFormI {
    [key: string]: string | number | undefined | boolean
}
const useForm = (data?: UseFormI) => {
    const [form, setForm] = useState<UseFormI | any>(data || {});

    const handleChange = (e: any) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    return [form, handleChange]
}

export default useForm