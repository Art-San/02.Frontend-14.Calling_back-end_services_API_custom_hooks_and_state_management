import { useState } from 'react'
// useForm $ QualityForm вместо CreateForm и EditForm
// Кастомные хуки. useForm

const useForm = (initialState = {}, onSubmit) => {
    const [form, setForm] = useState(initialState)
    const handeleSubmit = (e) => {
        e.preventDefault()
        onSubmit?.(form) // // Кастомные хуки. useForm без вопролса ? может быть ошибка
    }
    const handleChange = (target) => {
        setForm((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }))
    }
    return { handleChange, form, handeleSubmit }
}

export default useForm
