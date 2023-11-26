import * as React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { BsArrowLeftShort } from 'react-icons/bs'
import { NavLink, useNavigate } from 'react-router-dom'
import { ErrorResponse } from '../../api/rtk/api'
import { userApi } from '../../api/rtk/user.api'
import ButtonShared from '../../components/button/button-shared/ButtonShared'
import InputAuth from '../../components/input/input-auth/InputAuth'
import Modal from '../../components/modals/defaultModal/Modal'
import { ACCESS_TOKEN, LOGIN_ROUTE, POTIFON, REGISTRATION_ROUTE } from '../../constants/constants'
import { useActionCreators } from '../../hooks/useActionCreators'
import { useLocationPath } from '../../hooks/useLocationPath'
import { userActions } from '../../redux/reducers/userSlice'
import { User } from '../../types/User.type'
import styles from './Authorization.module.scss'
import { fieldInputForm } from './field-input-form'

export type UserForm = Pick<User['user'], 'email' | 'name'> & { password: string }

const Authorization: React.FC = () => {
    const [showModalError, setShowModalError] = React.useState(false)
    const navigate = useNavigate()
    const loginPath = useLocationPath('/login')

    const actions = useActionCreators(userActions)

    const [loginOrRegistration, { isSuccess, data: userData, isError, error: errorQuery }] = loginPath
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

    React.useEffect(() => {
        if (isError && !showModalError) setShowModalError(!showModalError)
    }, [isError])

    const onSubmit: SubmitHandler<UserForm> = async (user) => {
        try {
            await loginOrRegistration(user)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            {showModalError
                && <Modal textButton='Хорошо'
                    titleModal='Упс... Ошибка'
                    typeButton='button'
                    onClickButton={() => setShowModalError(!showModalError)}
                    onClickClear={() => setShowModalError(!showModalError)}
                    error={true}
                    errorMessage={(errorQuery as ErrorResponse)?.data?.message}
                />}
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
                                        <ButtonShared type='submit'>
                                            Войти
                                        </ButtonShared>
                                        <button type='button' className={styles.recovery}>Забыли пароль?</button>
                                    </>
                                    : <ButtonShared type='submit'>
                                        Зарегистрироваться
                                    </ButtonShared>
                                }
                            </div>
                        </div>
                        <hr />
                        <div className={styles.redirect}>
                            {loginPath
                                ? <p>
                                    <span>Нет аккаунта?</span> <NavLink to={`/${REGISTRATION_ROUTE}`}>Регистрация в {POTIFON}</NavLink>
                                </p>
                                : <p>
                                    <span>Есть аккаунт?</span> <NavLink to={`/${LOGIN_ROUTE}`}>Вход в {POTIFON}</NavLink>
                                </p>
                            }
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Authorization
