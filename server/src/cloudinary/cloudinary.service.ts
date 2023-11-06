import { Injectable } from '@nestjs/common'
import { UploadApiErrorResponse, UploadApiResponse, v2 as cloudinary } from 'cloudinary'

@Injectable()
export class CloudinaryService {

    async uploadFile(
        { buffer }: Express.Multer.File
    ): Promise<UploadApiErrorResponse | UploadApiResponse> {
        return new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                {},
                (err: UploadApiErrorResponse, result: UploadApiResponse) => {
                    if (err) return reject(err)
                    return resolve(result)
                }
            ).end(buffer)
        })
    }

}
