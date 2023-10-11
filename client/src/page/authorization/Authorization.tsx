import * as React from 'react'
import styles from './Authorization.module.scss'
import { NavLink, useLocation } from 'react-router-dom'
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '../../constants/constants'
import { useForm, SubmitHandler } from 'react-hook-form'
import { User } from '../../types/User'
import InputAuth from '../../components/input/input-auth/InputAuth'

const Authorization: React.FC = () => {
    const location = useLocation()
    const login = location.pathname === '/login'

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<User>()

    const onSubmit: SubmitHandler<User> = (data) => {
        reset()
    }

    return (
        <div className={styles.container}>
            <div>
                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.title}>
                        {login ?
                            <h1>Войти в Spotify</h1>
                            :
                            <h1>Зарегистрироваться в Spotify</h1>
                        }
                    </div>
                    <hr />
                    <div className={styles.content}>
                        <div className={styles.enter}>
                            {!login &&
                                <InputAuth
                                    title={'name'}
                                    errorMessage='Введите имя пользователя из аккаунта Spotify.'
                                    errors={errors.name}
                                    placeholder='Имя пользователя'
                                    register={register}
                                    type='text'
                                />
                            }
                            <InputAuth
                                title={'email'}
                                errorMessage='Введите адрес электронной почты из аккаунта Spotify.'
                                errors={errors.email}
                                placeholder='Email'
                                register={register}
                                type='text'
                            />
                            <InputAuth
                                title={'password'}
                                errorMessage='Введите пароль'
                                errors={errors.password}
                                placeholder='Пароль'
                                register={register}
                                type='password'
                            />
                        </div>
                        <div className={styles['div-button']}>
                            {login ?
                                <>
                                    <button className={styles.go} type='submit'><span>Войти</span></button>
                                    <button className={styles.recovery}>Забыли пароль?</button>
                                </>
                                :
                                <button className={styles.go} type='submit'><span>Зарегистрироваться</span></button>
                            }
                        </div>
                    </div>
                    <hr />
                    <div className={styles.redirect}>
                        {login ?
                            <p><span>Нет аккаунта?</span> <NavLink to={REGISTRATION_ROUTE}>Регистрация в Spotify</NavLink></p>
                            :
                            <p><span>Есть аккаунт?</span> <NavLink to={LOGIN_ROUTE}>Вход в Spotify</NavLink></p>
                        }
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Authorization
