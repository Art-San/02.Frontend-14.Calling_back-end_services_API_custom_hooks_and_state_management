import React, { useContext, useEffect, useRef, useState } from 'react'
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
    const prevState = useRef() // Оптимистическое

    useEffect(() => {
        const getQualities = async () => {
            try {
                const { content } = await qualityService.fetchAll()
                setQualities(content)
                setloading(false)
            } catch (error) {
                const { message } = error.response.data
                setError(message)
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
            const { message } = error.response.data
            setError(message)
        }
    }
    const addQuality = async (data) => {
        try {
            const { content } = await qualityService.create(data)
            setQualities((prevState) => [...prevState, content])
            return content
        } catch (error) {
            const { message } = error.response.data
            setError(message)
        }
    }
    //оптимистические обновления
    const deleteQuality = async (id) => {
        prevState.current = qualities // Оптимистическое
        setQualities((prevState) => {
            // Оптимистическое
            return prevState.filter((item) => item._id !== id)
        })
        try {
            await qualityService.delete(id) // Оптимистическое
            // const { content } = await qualityService.delete(id)          // Пессиместическое
            // setQualities((prevState) => {                                // Пессиместическое
            //    return prevState.filter(item => item._id !== content._id)
            // })
            // return content кажись это не нужно сдесь // Пессиместическое
        } catch (error) {
            const { message } = error.response.data
            toast('Object not deleted') // Оптимистическое
            setError(message)
            setQualities(prevState.current) // Оптимистическое
        }
    }
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

// Пессиместическое
// Оптимистическое
