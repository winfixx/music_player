import { Injectable, HttpException, HttpStatus, InternalServerErrorException } from '@nestjs/common'
import * as fs from 'fs'
import * as path from 'path'
import * as uuid from 'uuid'

@Injectable()
export class FilesService {

    createFile(file): string {
        try {
            const fileName = uuid.v4() + '.jpg'
            const filePath = path.resolve(__dirname, '..', '..', 'static', 'image')

            this.findOrCreateFile(filePath)

            fs.writeFileSync(path.join(filePath, fileName), file.buffer)

            return fileName
        } catch (error) {
            throw new InternalServerErrorException('Произошла ошибка при записи файла')
        }
    }

    removeFile(fileName: string): string {
        try {
            const filePath = path.resolve(__dirname, '..', '..', 'static', 'image', fileName)

            fs.unlinkSync(filePath)
            return fileName
        } catch (error) {
            throw new InternalServerErrorException('Произошла ошибка при удалении файла')
        }
    }

    private findOrCreateFile(filePath: fs.PathLike) {
        if (!fs.existsSync(filePath)) {
            fs.mkdirSync(filePath, { recursive: true })
        }
    }

}