import httpService from './http.service'
const qualityEndpoint = 'quality/'
// Извлечение переиспользуемого паттерна Qualities Service

const qualityService = {
    update: async (id, content) => {
        const { data } = await httpService.put(qualityEndpoint + id, content)
        // const { data } = await httpService.put( // Для создании ошибки
        //     qualityEndpoint + id + 'dfdfd',
        //     content
        // )
        return data
    },
    get: async (id) => {
        const { data } = await httpService.get(qualityEndpoint + id)
        return data
    },
    fetchAll: async () => {
        const { data } = await httpService.get(qualityEndpoint)
        return data
    }
}

export default qualityService
