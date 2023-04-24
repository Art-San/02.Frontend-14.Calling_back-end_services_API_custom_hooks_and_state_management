import React, { useContext, useEffect, useState } from 'react'
import qualityService from '../services/quality.service'

const QualitiesContext = React.createContext()

export const useQualities = () => {
    return useContext(QualitiesContext)
}

export const QualitiesProvider = ({ children }) => {
    const [qualities, setQualities] = useState([]) // useQualities
    const [error, setError] = useState(null) // useQualities
    console.log(error)
    const [isLoading, setloading] = useState(true) // useQualities
    useEffect(() => {
        // useQualities
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
    return (
        <QualitiesContext.Provider value={{ qualities, isLoading }}>
            {!isLoading ? children : <h1>Qualities Loading...</h1>}
            {
                children // ошибка, далее будет убранна
            }
        </QualitiesContext.Provider>
    )
}
// const QualitiesLoading = ({ children }) => {
//     const { isLoading } = useQualities()
//     if (!isLoading) {
//         return children
//     }
//     return <h1>Qualities Loading...</h1>
// }
