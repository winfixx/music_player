import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {

    constructor(

    ) { }

    getUser() {
        return {name: 'aa', age: 17}
    }
}