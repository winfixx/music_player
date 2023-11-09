import { ConfigService } from '@nestjs/config'

export const getMailConfig = async (
    configService: ConfigService,
): Promise<any> => {
    const host = configService.get<string>('SMTP_HOST')
    const port = +configService.get<string>('SMTP_PORT')
    const user = configService.get<string>('SMTP_USER')
    const pass = configService.get<string>('SMTP_PASSWORD')
    const mailFromName = configService.get<string>('SMTP_FROM_NAME')

    return {
        transport: {
            host,
            port,
            secure: true,
            auth: {
                user,
                pass,
            },
        },
        defaults: {
            from: `"${mailFromName}" <${user}>`,
        }
    }
}