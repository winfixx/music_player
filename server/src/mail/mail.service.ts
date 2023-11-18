import { Injectable } from '@nestjs/common'
import { MailerService } from '@nestjs-modules/mailer'

@Injectable()
export class MailService {

    constructor(
        private readonly mailerService: MailerService
    ) { }

    public async sendMail(
        to: string,
        link: string
    ) {
        return await this.mailerService.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: 'potifon ✔',
            text: `Активация аккаунта на ${process.env.CLIENT_API}`,
            html: `
                <div>
                    <h1>Для активации перейдите по ссылке</h1>
                    <a href="${link}">${link}</a>
                </div>
            `
        })
    }
}
