import React from 'react'
import QualityForm from '../components/ui/qualityForm'
import { useQualities } from '../hooks/useQualities'
const AddQualityPage = () => {
    const { addQuality } = useQualities() // useQualities(). Создание данных

    const handleSubmit = (data) => {
        addQuality(data) // useQualities(). Создание данных
        console.log('data', data)
    }
    return (
        <>
            <h1>Add Quality</h1>
            <QualityForm onSubmit={handleSubmit} />
        </>
    )
}

export default AddQualityPage
