import React from 'react'
// import CreateForm from "../components/ui/createForm";
import QualityForm from '../components/ui/qualityForm'
const AddQualityPage = () => {
    const handleSubmit = (data) => {
        // Кастомные хуки. useForm
        console.log('data', data)
    }
    return (
        <>
            <h1>Add Quality</h1>
            <QualityForm
                onSubmit={handleSubmit} // Кастомные хуки. useForm
            />
        </>
    )
}

export default AddQualityPage
