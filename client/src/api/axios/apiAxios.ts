import axios from 'axios'
import { ACCESS_TOKEN, REFRESH_ROUTE, SERVER_API } from '../../constants/constants'
import { User } from '../../types/User.type'

const apiAxios = axios.create({
    withCredentials: true,
    baseURL: SERVER_API
})


apiAxios.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
    return config
})

apiAxios.interceptors.response.use(config => {
    return config
}, async error => {
    const originalRequest = error.config
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true
        try {
            const { data } = await apiAxios.get<User>(`/auth/${REFRESH_ROUTE}`)
            if (data.token?.accessToken) localStorage.setItem(ACCESS_TOKEN, data?.token?.accessToken)
            return apiAxios.request(originalRequest)
        } catch (e) {
            console.log('НЕ АВТОРИЗОВАН')
        }
    }
    throw error
})

export default apiAxios
