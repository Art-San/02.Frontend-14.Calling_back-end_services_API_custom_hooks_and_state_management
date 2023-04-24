import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import qualityService from '../services/quality.service'

const QualitiesContext = React.createContext()

export const useQualities = () => {
    return useContext(QualitiesContext)
}

export const QualitiesProvider = ({ children }) => {
    const [qualities, setQualities] = useState([])
    const [error, setError] = useState(null)
    const [isLoading, setloading] = useState(true)

    useEffect(() => {
        const getQualities = async () => {
            try {
                const { content } = await qualityService.fetchAll()
                setQualities(content)
                setloading(false)
            } catch (error) {
                errorCatcher(error)
            }
        }
        getQualities()
    }, [])

    const getQuality = (id) => {
        return qualities.find((q) => q._id === id)
    }
    const updateQuality = async ({ _id: id, ...data }) => {
        try {
            const { content } = await qualityService.update(id, data)
            setQualities((prevState) =>
                prevState.map((item) => {
                    if (item._id === content._id) {
                        return content
                    }
                    return item
                })
            )
            return content
        } catch (error) {
            errorCatcher(error)
        }
    }
    const addQuality = async (data) => {
        try {
            const { content } = await qualityService.create(data)
            setQualities((prevState) => [...prevState, content])
            return content
        } catch (error) {
            errorCatcher(error)
        }
    }

    const deleteQuality = async (id) => {
        try {
            const { content } = await qualityService.delete(id)
            setQualities((prevState) => {
                return prevState.filter((item) => item._id !== content._id)
            })
        } catch (error) {
            errorCatcher(error)
        }
    }
    function errorCatcher(error) {
        // Глобальная обработка ошибок
        const { message } = error.response.data
        setError(message)
    }
    useEffect(() => {
        // Глобальная обработка ошибок
        if (error !== null) {
            toast(error)
            setError(null)
        }
    }, [error])
    return (
        <QualitiesContext.Provider
            value={{
                qualities,
                getQuality,
                updateQuality,
                addQuality,
                deleteQuality
            }}
        >
            {!isLoading ? children : <h1>Qualities Loading...</h1>}
        </QualitiesContext.Provider>
    )
}
