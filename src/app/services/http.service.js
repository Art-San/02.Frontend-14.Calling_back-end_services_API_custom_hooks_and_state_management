import axios from 'axios'
import logger from './log.service'
import { toast } from 'react-toastify' // Отображение ошибок с помощью toastify

// В курсе используется react-toastify версии 8.1.0,
// мы рекомендуем также устанавливать эту версию.
// Установить её можно при помощи команды:
// response - ответ от сервера
axios.interceptors.response.use(
    (res) => res,
    function (error) {
        const expectedErrors =
            error.response &&
            error.response.status >= 400 &&
            error.response.status < 500

        if (!expectedErrors) {
            logger.log(error)
            toast.error('Somthing was wrong. Try it leter') // Отображение ошибок с помощью toastify
        }
        return Promise.reject(error)
    }
)
const httpService = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
}

export default httpService
