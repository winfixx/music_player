import * as React from 'react'
import styles from './InputAuth.module.scss'
import { BiErrorAlt } from 'react-icons/bi'
import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { User } from '../../../types/User'

interface AuthInputProps {
    register: UseFormRegister<User>
    errors: FieldErrors | undefined | any
    title: keyof User
    placeholder: string
    errorMessage: string
    type: string
}

const InputAuth: React.FC<AuthInputProps> = React.memo(({
    errors,
    register,
    title,
    errorMessage,
    ...props
}) => {

    return (
        <label className={styles.label} htmlFor={title}>
            <span className={styles.des}>{props.placeholder}</span>
            <input
                className={errors && styles['input-error']}
                {...register(title, { required: true })}
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
