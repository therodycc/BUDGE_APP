import React, { useState } from 'react'

const useForm = () => {
    const [form, setForm] = useState<{ [key: string]: string } | any>({});

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    }

    return [form, handleChange]
}

export default useForm