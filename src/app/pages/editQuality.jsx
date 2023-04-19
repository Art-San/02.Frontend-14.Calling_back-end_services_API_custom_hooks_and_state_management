import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import EditForm from '../components/ui/editForm'
// get запрашиваем
// post создаем объект
// put изменяем существующий
// delete -- соответственно

const EditQualityPage = () => {
    const [quality, setQuality] = useState(null) // Создание новых данных
    const id = useParams().id // Создание новых данных
    const qualityEndPoint = `http://localhost:4000/api/v1/quality/${id}` // Создание новых данных

    const handleSubmit = (data) => {
        // Создание новых данных
        axios
            .put(qualityEndPoint, data)
            .then((res) => console.log('res.data.content', res.data.content))
    }

    useEffect(() => {
        // Создание новых данных
        const loadData = async () => {
            const { data } = await axios.get(qualityEndPoint)
            setQuality(data.content)
        }
        loadData()
    }, [])
    return (
        <>
            <h1>Edit Quality Page</h1>{' '}
            {quality === null ? (
                'Loading...'
            ) : (
                <EditForm
                    data={quality}
                    onSubmit={handleSubmit} // Создание новых данных
                />
            )}
        </>
    )
}

export default EditQualityPage
