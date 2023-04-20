import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import EditForm from '../components/ui/editForm'
// response - ответ от сервера // interceptors перехватчик запросов и ответов
axios.interceptors.response.use(
    (res) => res,
    function (error) {
        const expectedErrors =
            error.response &&
            error.response.status >= 400 &&
            error.response.status < 500

        if (!expectedErrors) {
            console.log('Hепредвиденная ошибка')
        }
        return Promise.reject(error)
    }
)

const EditQualityPage = () => {
    const [quality, setQuality] = useState(null)
    const id = useParams().id
    const qualityEndPoint = `http://localhost:4000/api/v1/quality/${id}`

    const handleSubmit = async (data) => {
        try {
            await axios
                .put(qualityEndPoint, data)
                // .put(qualityEndPoint + 'hhh', data) // Ожидаемая ошибка + hhh
                .then((res) => console.log(res.data.content))
        } catch (error) {
            console.log('Ожидаемая ошибка')
        }
    }

    useEffect(() => {
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
                <EditForm data={quality} onSubmit={handleSubmit} />
            )}
        </>
    )
}

export default EditQualityPage
