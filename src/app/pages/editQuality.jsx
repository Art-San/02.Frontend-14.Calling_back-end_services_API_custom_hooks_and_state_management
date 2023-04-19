import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import EditForm from '../components/ui/editForm'

const EditQualityPage = () => {
    const [quality, setQuality] = useState(null)
    const id = useParams().id
    const qualityEndPoint = `http://localhost:4000/api/v1/quality/${id}`

    const handleSubmit = async (data) => {
        try {
            //Ожидаемые и неожиданные ошибки
            await axios
                // .put(qualityEndPoint + 'fg', data) //+ 'fg' выдает Ожидаемую ошибку
                .put(qualityEndPoint, data)
                .then((res) => console.log(res.data.content))
        } catch (error) {
            const expectedErrors =
                error.response &&
                error.response.status >= 400 &&
                error.response.status < 500
            if (!expectedErrors) {
                console.log('Упал сервер или чтото подобное')
            } else {
                console.log('Ожидаемая ошибка')
            }
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
