import axios from "axios";
import logger from './log.service'
import { toast } from 'react-toastify'
import config from '../config.json'

axios.defaults.baseURL = config.apiEndpoint
// response - ответ от сервера
axios.interceptors.response.use(
    (res) => res,
    function(error) {
        const expectedErrors = 
            error.response &&
            error.response.status >= 400 &&
            error.response.status < 500

        if (!expectedErrors) {
            logger.log(error)
            toast.error('Somthing was wrong. Try it leter')
        }
        return Promise.reject(error)
})
const httpService = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
}

export default httpService

