import * as React from 'react'
import Modal from '../defaultModal/Modal'
import ListGenres from '../../list/genres/ListGenres'
import styles from './WelcomeModal.module.scss'
import { Genre } from '../../../types/Genre.type'

interface IWelcomeModalProps {
    onSubmitPreferences: () => void
    onSetGenres: (genreInfo: Genre) => void
    dataGenres: Genre[] | undefined
}

const WelcomeModal: React.FunctionComponent<IWelcomeModalProps> = ({
    dataGenres,
    onSubmitPreferences,
    onSetGenres
}) => {
    return (
        <Modal error={false}
            typeButton='submit'
            textButton='Отправить'
            titleModal='Добро пожаловать в potifon!'
            onClickClear={onSubmitPreferences}
            onClickButton={onSubmitPreferences}
        >
            <span className={styles.title__modal}>Выберите любимые жанры</span>
            <ListGenres dataGenres={dataGenres}
                onSetGenres={onSetGenres}
            />
        </Modal>

    )
}

export default WelcomeModal
