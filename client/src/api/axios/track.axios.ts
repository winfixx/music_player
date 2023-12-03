import { TRACK_ROUTE } from '../../constants/constants'
import apiAxios from './apiAxios'

class PlaylistApi {
    public async updateInfo(formData: FormData) {
        const { data } = await apiAxios.post(`/${TRACK_ROUTE}/update-info`, formData)
        return data
    }
}
export default new PlaylistApi()