import { AuthInputProps } from '../../components/input/input-auth/InputAuth'
import { POTIFON } from '../../constants/constants'

export const fieldInputForm: AuthInputProps[] = [
    {
        title: 'name',
        placeholder: 'Имя пользователя',
        errorMessage: {
            loginPath: `Введите имя пользователя из аккаунта ${POTIFON}.`,
            regPath: 'Введите имя пользователя'
        },
        type: 'text',
        minLength: null,
        errors: '',
        register: ''
    },
    {
        title: 'email',
        placeholder: 'Email  пользователя',
        errorMessage: {
            loginPath: `Введите адрес электронной почты из аккаунта ${POTIFON}.`,
            regPath: 'Введите адрес электронной почты'
        },
        type: 'email',
        minLength: null,
        errors: '',
        register: ''
    },
    {
        title: 'password',
        placeholder: 'Пароль  пользователя',
        errorMessage: {
            loginPath: `Введите пароль пользователя из аккаунта ${POTIFON}.`,
            regPath: 'Введите пароль. Минимум 5 символов.'
        },
        type: 'password',
        minLength: 5,
        errors: '',
        register: ''
    },
]
