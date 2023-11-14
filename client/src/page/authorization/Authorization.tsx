import * as React from 'react'
import styles from './Authorization.module.scss'
import { useForm, SubmitHandler } from 'react-hook-form'
import { BsArrowLeftShort } from 'react-icons/bs'
import { NavLink, useNavigate } from 'react-router-dom'
import { ACCESS_TOKEN, LOGIN_ROUTE, POTIFON, REGISTRATION_ROUTE } from '../../constants/constants'
import { User } from '../../types/User'
import InputAuth from '../../components/input/input-auth/InputAuth'
import { userApi } from '../../api/user.api'
import { userActions } from '../../redux/reducers/userSlice'
import { useActionCreators } from '../../hooks/useActionCreators'
import { useLocationPath } from '../../hooks/useLocationPath'
import { fieldInputForm } from './field-input-form'

export type UserForm = Pick<User['user'], 'email' | 'name'> & { password: string }

const Authorization: React.FC = () => {
    const navigate = useNavigate()
    const loginPath = useLocationPath('/login')

    const actions = useActionCreators(userActions)
    // const [registration, { isSuccess: isSuccessReg, data: userDataReg, error: errorReg, isError: isErrorReg }] = userApi.useRegistrationMutation()
    // const [login, { isSuccess: isSuccessLogin, data: userDataLogin, error: errorLogin, isError: isErrorLogin }] = userApi.useLoginMutation()

    const [loginOrRegistration, { isSuccess, data: userData, isError, error }] = loginPath
        ? userApi.useLoginMutation()
        : userApi.useRegistrationMutation()

    const { register, handleSubmit, formState: { errors }, } = useForm<UserForm>()

    React.useEffect(() => {
        if (isSuccess) {
            localStorage.setItem(ACCESS_TOKEN, String(userData?.token?.accessToken))
            actions.setUser(userData?.user)
            navigate('/')
        }
    }, [userData?.user.id])

    if (isError) {
        console.log(error)
    }

    const onSubmit: SubmitHandler<UserForm> = async (user) => {
        try {
            // if (loginPath) {
            //     await login(user)
            // }

            await loginOrRegistration(user)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={styles.container}>
            <div>
                <span onClick={() =>
                    navigate('/')} className={styles.back}
                >
                    <BsArrowLeftShort />
                </span>

                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.title}>
                        {loginPath ?
                            <h1>Войти в {POTIFON}</h1>
                            :
                            <h1>Зарегистрироваться в {POTIFON}</h1>
                        }
                    </div>
                    <hr />
                    <div className={styles.content}>
                        <div className={styles.enter}>
                            {fieldInputForm.map(({ title, errorMessage, placeholder, type, minLength }) =>
                                <InputAuth key={title}
                                    title={title}
                                    errorMessage={loginPath
                                        ? errorMessage.loginPath
                                        : errorMessage.regPath
                                    }
                                    errors={errors[title]}
                                    placeholder={placeholder}
                                    register={register}
                                    type={type}
                                    minLength={minLength}
                                />
                            )}
                        </div>
                        <div className={styles['div-button']}>
                            {loginPath
                                ? <>
                                    <button className={styles.go} type='submit'>
                                        <span>Войти</span>
                                    </button>
                                    <button className={styles.recovery}>Забыли пароль?</button>
                                </>
                                : <button className={styles.go} type='submit'>
                                    <span>Зарегистрироваться</span>
                                </button>
                            }
                        </div>
                    </div>
                    <hr />
                    <div className={styles.redirect}>
                        {loginPath
                            ? <p>
                                <span>Нет аккаунта?</span> <NavLink to={REGISTRATION_ROUTE}>Регистрация в {POTIFON}</NavLink>
                            </p>
                            : <p>
                                <span>Есть аккаунт?</span> <NavLink to={LOGIN_ROUTE}>Вход в {POTIFON}</NavLink>
                            </p>
                        }
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Authorization
