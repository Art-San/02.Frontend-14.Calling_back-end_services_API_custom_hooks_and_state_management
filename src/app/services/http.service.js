import axios from 'axios'
import * as Sentry from '@sentry/react' // Логирование ошибок
// response - ответ от сервера
axios.interceptors.response.use(
    (res) => res,
    function (error) {
        const expectedErrors =
            error.response &&
            error.response.status >= 400 &&
            error.response.status < 500

        if (!expectedErrors) {
            Sentry.captureException(error) // Логирование ошибок
            console.log('unexpected error')
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
