import { ALBUM_ROUTE } from '../../constants/constants'
import apiAxios from './apiAxios'

class AlbumApi {
    public async updateInfo(formData: FormData) {
        const { data } = await apiAxios.post(`/${ALBUM_ROUTE}/update-info`, formData)
        return data
    }
}
export default new AlbumApi()