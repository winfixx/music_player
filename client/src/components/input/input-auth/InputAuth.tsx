import * as React from 'react'
import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { BiErrorAlt } from 'react-icons/bi'
import { UserForm } from '../../../page/authorization/Authorization'
import styles from './InputAuth.module.scss'

export interface AuthInputProps {
    register: UseFormRegister<UserForm> | any
    errors: FieldErrors | undefined | any
    title: keyof UserForm
    placeholder: string
    errorMessage: string | any
    type: 'text' | 'email' | 'password'
    minLength?: number | null
}

const InputAuth: React.FC<AuthInputProps> = React.memo(({
    errors,
    register,
    title,
    errorMessage,
    minLength,
    ...props
}) => {
    return (
        <label className={styles.label} htmlFor={title}>
            <span className={styles.des}>{props.placeholder}</span>
            <input
                className={errors && styles['input-error']}
                {...register(title, { required: true, minLength })}
                id={title}
                {...props}
                autoComplete='off'
            />
            {errors &&
                <div className={styles.error}>
                    <span>{<BiErrorAlt />}</span>
                    <p>{errorMessage}</p>
                </div>
            }
        </label>
    )
})

export default InputAuth
