import { USER_ROUTE } from '../../constants/constants'
import apiAxios from './apiAxios'

class UserApi {
    public async updateInfo(formData: FormData) {
        const { data } = await apiAxios.post(`/${USER_ROUTE}/update-info`, formData)
        return data
    }
}
export default new UserApi()