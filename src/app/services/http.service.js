import axios from 'axios'
import logger from './log.service' // Переиспользуемый паттерн логирования ошибок
// response - ответ от сервера
axios.interceptors.response.use(
    (res) => res,
    function (error) {
        const expectedErrors =
            error.response &&
            error.response.status >= 400 &&
            error.response.status < 500

        if (!expectedErrors) {
            logger.log(error) // Переиспользуемый паттерн логирования ошибок
            console.log('Unexpected error')
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
